<?php

namespace App\Http\Controllers;

use App\Models\ConsultingHeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ConsultingHeroSlideController extends Controller
{
    public function index(Request $request)
    {
        $query = ConsultingHeroSlide::query();

        if ($request->boolean('admin')) {
            $user = $request->user('sanctum');
            abort_if(!$user, 401, 'Unauthenticated.');
            abort_if(!$user->tokenCan('consulting'), 403, 'Cette action est reservee aux administrateurs.');
        } else {
            $query->where('is_active', true);
        }

        $items = $query
            ->orderBy('sort_order')
            ->orderBy('created_at')
            ->get()
            ->map(fn(ConsultingHeroSlide $item) => $this->transform($item));

        return response()->json(['data' => $items]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tag'                  => ['nullable', 'string', 'max:100'],
            'tab_label'            => ['required', 'string', 'max:100'],
            'headline'             => ['required', 'string'],
            'headline_highlight'   => ['nullable', 'string', 'max:255'],
            'subtitle'             => ['nullable', 'string'],
            'bullets'              => ['nullable', 'array'],
            'bullets.*'            => ['string', 'max:255'],
            'cta_primary_label'    => ['nullable', 'string', 'max:100'],
            'cta_primary_link'     => ['nullable', 'string', 'max:255'],
            'cta_secondary_label'  => ['nullable', 'string', 'max:100'],
            'cta_secondary_link'   => ['nullable', 'string', 'max:255'],
            'sort_order'           => ['nullable', 'integer', 'min:0'],
            'image'                => ['nullable', 'image', 'max:6144'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('consulting-hero-slides', 'public');
        }

        $item = ConsultingHeroSlide::create([
            'tag'                 => $data['tag'] ?? null,
            'tab_label'           => $data['tab_label'],
            'headline'            => $data['headline'],
            'headline_highlight'  => $data['headline_highlight'] ?? null,
            'subtitle'            => $data['subtitle'] ?? null,
            'bullets'             => $data['bullets'] ?? null,
            'cta_primary_label'   => $data['cta_primary_label'] ?? 'Démarrer un projet',
            'cta_primary_link'    => $data['cta_primary_link'] ?? '#contact',
            'cta_secondary_label' => $data['cta_secondary_label'] ?? null,
            'cta_secondary_link'  => $data['cta_secondary_link'] ?? null,
            'image_path'          => $imagePath,
            'sort_order'          => $data['sort_order'] ?? 0,
            'is_active'           => true,
        ]);

        return response()->json(['data' => $this->transform($item)], 201);
    }

    public function update(Request $request, ConsultingHeroSlide $consultingHeroSlide)
    {
        $data = $request->validate([
            'tag'                  => ['nullable', 'string', 'max:100'],
            'tab_label'            => ['sometimes', 'string', 'max:100'],
            'headline'             => ['sometimes', 'string'],
            'headline_highlight'   => ['nullable', 'string', 'max:255'],
            'subtitle'             => ['nullable', 'string'],
            'bullets'              => ['nullable', 'array'],
            'bullets.*'            => ['string', 'max:255'],
            'cta_primary_label'    => ['nullable', 'string', 'max:100'],
            'cta_primary_link'     => ['nullable', 'string', 'max:255'],
            'cta_secondary_label'  => ['nullable', 'string', 'max:100'],
            'cta_secondary_link'   => ['nullable', 'string', 'max:255'],
            'sort_order'           => ['nullable', 'integer', 'min:0'],
            'is_active'            => ['sometimes', 'boolean'],
            'image'                => ['nullable', 'image', 'max:6144'],
        ]);

        if ($request->hasFile('image')) {
            if ($consultingHeroSlide->image_path && !Str::startsWith($consultingHeroSlide->image_path, ['http://', 'https://', '/'])) {
                Storage::disk('public')->delete($consultingHeroSlide->image_path);
            }
            $consultingHeroSlide->image_path = $request->file('image')->store('consulting-hero-slides', 'public');
        }

        $consultingHeroSlide->fill($data);
        $consultingHeroSlide->save();

        return response()->json(['data' => $this->transform($consultingHeroSlide)]);
    }

    public function destroy(ConsultingHeroSlide $consultingHeroSlide)
    {
        if ($consultingHeroSlide->image_path && !Str::startsWith($consultingHeroSlide->image_path, ['http://', 'https://', '/'])) {
            Storage::disk('public')->delete($consultingHeroSlide->image_path);
        }

        $consultingHeroSlide->delete();

        return response()->json(['message' => 'Slide supprimée.']);
    }

    private function transform(ConsultingHeroSlide $item): array
    {
        $isStaticAsset = $item->image_path && Str::startsWith($item->image_path, ['http://', 'https://', '/']);

        return [
            'id'                   => $item->id,
            'tag'                  => $item->tag,
            'tab_label'            => $item->tab_label,
            'headline'             => $item->headline,
            'headline_highlight'   => $item->headline_highlight,
            'subtitle'             => $item->subtitle,
            'bullets'              => $item->bullets ?? [],
            'cta_primary_label'    => $item->cta_primary_label,
            'cta_primary_link'     => $item->cta_primary_link,
            'cta_secondary_label'  => $item->cta_secondary_label,
            'cta_secondary_link'   => $item->cta_secondary_link,
            'sort_order'           => $item->sort_order,
            'is_active'            => $item->is_active,
            'image_url'            => $item->image_path
                ? ($isStaticAsset ? $item->image_path : asset('storage/' . $item->image_path))
                : null,
        ];
    }
}
