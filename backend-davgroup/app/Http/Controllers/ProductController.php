<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use App\Models\BeautyService;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->where('is_active', true);

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('name', $request->string('category')));
        }

        $products = $query->orderBy('name')->get()->map(fn (Product $p) => $this->transform($p));

        return response()->json(['data' => $products]);
    }

    public function show($id)
    {
        $p = Product::with('category')->findOrFail($id);
        return response()->json(['data' => $this->transform($p)]);
    }

    /** Sélection de produits et prestations à suggérer aux visiteurs. */
    public function featured()
    {
        $products = Product::with('category')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->latest('updated_at')
            ->limit(12)
            ->get()
            ->map(function (Product $product) {
                $item = $this->transform($product);
                $category = Str::lower($item['category'] ?? '');

                return array_merge($item, [
                    'id' => 'product-' . $product->id,
                    'source_id' => $product->id,
                    'kind' => 'product',
                    'detail_url' => Str::contains($category, 'capill')
                        ? '/beaute/capillaires?product=' . $product->id
                        : '/beaute/cosmetiques?product=' . $product->id,
                ]);
            });

        $services = BeautyService::query()
            ->where('is_active', true)
            ->where('is_featured', true)
            ->whereIn('category_key', ['coiffure', 'ongerie', 'spa'])
            ->latest('updated_at')
            ->limit(12)
            ->get()
            ->map(function (BeautyService $service) {
                $labels = [
                    'coiffure' => 'Coiffure',
                    'ongerie' => 'Onglerie',
                    'spa' => 'Spa & détente',
                ];

                return [
                    'id' => 'service-' . $service->id,
                    'source_id' => $service->id,
                    'kind' => 'service',
                    'name' => $service->title,
                    'description' => $service->description ?: $service->subtitle,
                    'category' => $labels[$service->category_key] ?? $service->category_key,
                    'price' => null,
                    'price_label' => $service->price,
                    'badge' => 'Prestation vedette',
                    'image' => $service->image_path ? asset('storage/' . $service->image_path) : null,
                    'detail_url' => '/davbeaute?service=' . $service->id,
                ];
            });

        return response()->json(['data' => $products->concat($services)->values()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'quantity' => ['nullable', 'integer', 'min:0'],
            'min_quantity' => ['nullable', 'integer', 'min:0'],
            'sku' => ['required', 'string', 'max:100', 'unique:products,sku'],
            'badge' => ['nullable', 'string', 'max:50'],
            'is_active' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:4096'],
            'image2' => ['nullable', 'image', 'max:4096'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = '/storage/' . $request->file('image')->store('products', 'public');
        }

        $image2Path = null;
        if ($request->hasFile('image2')) {
            $image2Path = '/storage/' . $request->file('image2')->store('products', 'public');
        }

        $product = Product::create([
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'slug' => Str::slug($data['name']) . '-' . Str::random(6),
            'description' => $data['description'] ?? null,
            'price' => $data['price'],
            'cost' => $data['cost'] ?? null,
            'quantity' => $data['quantity'] ?? 0,
            'min_quantity' => $data['min_quantity'] ?? 10,
            'sku' => $data['sku'],
            'badge' => $data['badge'] ?? null,
            'is_active' => $request->boolean('is_active', true),
            'is_featured' => $request->boolean('is_featured', false),
            'image' => $imagePath,
            'image2' => $image2Path,
        ]);

        return response()->json(['data' => $this->transform($product->load('category'))], 201);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'category_id' => ['sometimes', 'exists:categories,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'quantity' => ['sometimes', 'integer', 'min:0'],
            'min_quantity' => ['sometimes', 'integer', 'min:0'],
            'sku' => ['sometimes', 'string', 'max:100', 'unique:products,sku,' . $product->id],
            'badge' => ['nullable', 'string', 'max:50'],
            'is_active' => ['sometimes', 'boolean'],
            'is_featured' => ['sometimes', 'boolean'],
            'image' => ['nullable', 'image', 'max:4096'],
            'image2' => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('image')) {
            if ($product->image && Str::startsWith($product->image, '/storage/')) {
                Storage::disk('public')->delete(Str::after($product->image, '/storage/'));
            }
            $data['image'] = '/storage/' . $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('image2')) {
            if ($product->image2 && Str::startsWith($product->image2, '/storage/')) {
                Storage::disk('public')->delete(Str::after($product->image2, '/storage/'));
            }
            $data['image2'] = '/storage/' . $request->file('image2')->store('products', 'public');
        }

        $product->fill($data);
        $product->save();

        return response()->json(['data' => $this->transform($product->load('category'))]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Produit supprimé.']);
    }

    private function transform(Product $p): array
    {
        return [
            'id' => $p->id,
            'category_id' => $p->category_id,
            'name' => $p->name,
            'slug' => $p->slug,
            'description' => $p->description,
            'price' => (float) $p->price,
            'cost' => $p->cost !== null ? (float) $p->cost : null,
            'quantity' => $p->quantity,
            'min_quantity' => $p->min_quantity,
            'sku' => $p->sku,
            'badge' => $p->badge,
            'image' => $p->image ? (preg_match('/^https?:\/\//', $p->image) ? $p->image : url($p->image)) : null,
            'image2' => $p->image2 ? (preg_match('/^https?:\/\//', $p->image2) ? $p->image2 : url($p->image2)) : null,
            'category' => $p->category ? $p->category->name : null,
            'is_active' => (bool) $p->is_active,
            'is_featured' => (bool) $p->is_featured,
        ];
    }
}
