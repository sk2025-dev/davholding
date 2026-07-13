<?php

namespace App\Http\Controllers;

use App\Models\PromoSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PromoSlideController extends Controller
{
    public function index(Request $request)
    {
        $query = PromoSlide::query();

        if (!$request->boolean('admin')) {
            $query->where('is_active', true);
        }

        $slides = $query
            ->orderBy('sort_order')
            ->orderBy('created_at')
            ->get()
            ->map(fn(PromoSlide $slide) => $this->transform($slide));

        return response()->json(['data' => $slides]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'subtitle'    => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'link_url'    => ['nullable', 'url', 'max:500'],
            'link_label'  => ['nullable', 'string', 'max:100'],
            'sort_order'  => ['nullable', 'integer', 'min:0'],
            'image'       => ['nullable', 'image', 'max:6144'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('promo-slides', 'public');
        }

        $slide = PromoSlide::create([
            'title'       => $data['title'],
            'subtitle'    => $data['subtitle'] ?? null,
            'description' => $data['description'] ?? null,
            'image_path'  => $imagePath,
            'link_url'    => $data['link_url'] ?? null,
            'link_label'  => $data['link_label'] ?? 'En savoir plus',
            'sort_order'  => $data['sort_order'] ?? 0,
            'is_active'   => true,
        ]);

        return response()->json(['data' => $this->transform($slide)], 201);
    }

    public function update(Request $request, PromoSlide $promoSlide)
    {
        $data = $request->validate([
            'title'       => ['sometimes', 'string', 'max:255'],
            'subtitle'    => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'link_url'    => ['nullable', 'max:500'],
            'link_label'  => ['nullable', 'string', 'max:100'],
            'sort_order'  => ['nullable', 'integer', 'min:0'],
            'is_active'   => ['sometimes', 'boolean'],
            'image'       => ['nullable', 'image', 'max:6144'],
        ]);

        if ($request->hasFile('image')) {
            if ($promoSlide->image_path) {
                Storage::disk('public')->delete($promoSlide->image_path);
            }
            $promoSlide->image_path = $request->file('image')->store('promo-slides', 'public');
        }

        $promoSlide->fill($data);
        $promoSlide->save();

        return response()->json(['data' => $this->transform($promoSlide)]);
    }

    public function destroy(PromoSlide $promoSlide)
    {
        if ($promoSlide->image_path) {
            Storage::disk('public')->delete($promoSlide->image_path);
        }

        $promoSlide->delete();

        return response()->json(['message' => 'Slide supprimée.']);
    }

    private function transform(PromoSlide $slide): array
    {
        return [
            'id'          => $slide->id,
            'title'       => $slide->title,
            'subtitle'    => $slide->subtitle,
            'description' => $slide->description,
            'image_url'   => $slide->image_path ? asset('storage/' . $slide->image_path) : null,
            'link_url'    => $slide->link_url,
            'link_label'  => $slide->link_label,
            'sort_order'  => $slide->sort_order,
            'is_active'   => $slide->is_active,
        ];
    }
}
