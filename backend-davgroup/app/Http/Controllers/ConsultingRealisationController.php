<?php

namespace App\Http\Controllers;

use App\Models\ConsultingRealisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ConsultingRealisationController extends Controller
{
    public function index(Request $request)
    {
        $query = ConsultingRealisation::query();

        if ($request->boolean('admin')) {
            $user = $request->user('sanctum');
            abort_if(!$user, 401, 'Unauthenticated.');
            abort_if(!$user->tokenCan('consulting'), 403, 'Cette action est reservee aux administrateurs.');
        } else {
            $query->where('is_active', true);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        $items = $query
            ->orderBy('sort_order')
            ->orderBy('created_at')
            ->get()
            ->map(fn(ConsultingRealisation $item) => $this->transform($item));

        return response()->json(['data' => $items]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category'    => ['required', 'string', 'in:branding,developpement,design,secure'],
            'tag'         => ['nullable', 'string', 'max:100'],
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'tags'        => ['nullable', 'array'],
            'tags.*'      => ['string', 'max:50'],
            'sort_order'  => ['nullable', 'integer', 'min:0'],
            'image'       => ['nullable', 'image', 'max:6144'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('consulting-realisations', 'public');
        }

        $item = ConsultingRealisation::create([
            'category'    => $data['category'],
            'tag'         => $data['tag'] ?? null,
            'title'       => $data['title'],
            'description' => $data['description'] ?? null,
            'image_path'  => $imagePath,
            'tags'        => $data['tags'] ?? null,
            'sort_order'  => $data['sort_order'] ?? 0,
            'is_active'   => true,
        ]);

        return response()->json(['data' => $this->transform($item)], 201);
    }

    public function update(Request $request, ConsultingRealisation $consultingRealisation)
    {
        $data = $request->validate([
            'category'    => ['sometimes', 'string', 'in:branding,developpement,design,secure'],
            'tag'         => ['nullable', 'string', 'max:100'],
            'title'       => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'tags'        => ['nullable', 'array'],
            'tags.*'      => ['string', 'max:50'],
            'sort_order'  => ['nullable', 'integer', 'min:0'],
            'is_active'   => ['sometimes', 'boolean'],
            'image'       => ['nullable', 'image', 'max:6144'],
        ]);

        if ($request->hasFile('image')) {
            if ($consultingRealisation->image_path && !Str::startsWith($consultingRealisation->image_path, ['http://', 'https://', '/'])) {
                Storage::disk('public')->delete($consultingRealisation->image_path);
            }
            $consultingRealisation->image_path = $request->file('image')->store('consulting-realisations', 'public');
        }

        $consultingRealisation->fill($data);
        $consultingRealisation->save();

        return response()->json(['data' => $this->transform($consultingRealisation)]);
    }

    public function destroy(ConsultingRealisation $consultingRealisation)
    {
        if ($consultingRealisation->image_path && !Str::startsWith($consultingRealisation->image_path, ['http://', 'https://', '/'])) {
            Storage::disk('public')->delete($consultingRealisation->image_path);
        }

        $consultingRealisation->delete();

        return response()->json(['message' => 'Réalisation supprimée.']);
    }

    private function transform(ConsultingRealisation $item): array
    {
        $isStaticAsset = $item->image_path && Str::startsWith($item->image_path, ['http://', 'https://', '/']);

        return [
            'id'          => $item->id,
            'category'    => $item->category,
            'tag'         => $item->tag,
            'title'       => $item->title,
            'description' => $item->description,
            'tags'        => $item->tags ?? [],
            'sort_order'  => $item->sort_order,
            'is_active'   => $item->is_active,
            'image_url'   => $item->image_path
                ? ($isStaticAsset ? $item->image_path : asset('storage/' . $item->image_path))
                : null,
        ];
    }
}
