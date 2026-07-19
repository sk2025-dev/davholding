<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::query();
        if (!$request->boolean('admin')) {
            $query->where('is_active', true);
        }

        return response()->json([
            'data' => $query->orderBy('sort_order')->orderByDesc('created_at')->get()->map(
                fn (Testimonial $item) => $this->transform($item)
            ),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('testimonials', 'public');
        }
        $testimonial = Testimonial::create($data);
        return response()->json(['data' => $this->transform($testimonial)], 201);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $this->validated($request, true);
        if ($request->hasFile('photo')) {
            if ($testimonial->photo_path) Storage::disk('public')->delete($testimonial->photo_path);
            $data['photo_path'] = $request->file('photo')->store('testimonials', 'public');
        }
        $testimonial->update($data);
        return response()->json(['data' => $this->transform($testimonial->fresh())]);
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->photo_path) Storage::disk('public')->delete($testimonial->photo_path);
        $testimonial->delete();
        return response()->json(['message' => 'Témoignage supprimé.']);
    }

    private function validated(Request $request, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';
        return $request->validate([
            'client_name' => [$required, 'string', 'max:120'],
            'content' => [$required, 'string', 'max:1500'],
            'rating' => ['nullable', 'integer', 'between:1,5'],
            'service' => ['nullable', 'string', 'max:120'],
            'source' => ['nullable', 'string', 'max:80'],
            'source_url' => ['nullable', 'url', 'max:500'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'photo' => ['nullable', 'image', 'max:3072'],
        ]);
    }

    private function transform(Testimonial $item): array
    {
        return [
            'id' => $item->id,
            'client_name' => $item->client_name,
            'content' => $item->content,
            'rating' => $item->rating,
            'service' => $item->service,
            'source' => $item->source,
            'source_url' => $item->source_url,
            'photo_url' => $item->photo_path ? asset('storage/'.$item->photo_path) : null,
            'sort_order' => $item->sort_order,
            'is_active' => $item->is_active,
        ];
    }
}
