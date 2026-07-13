<?php

namespace App\Http\Controllers;

use App\Models\ConsultingSectionImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ConsultingSectionImageController extends Controller
{
    private const SECTION_KEYS = ['design', 'it', 'mobile'];

    private const DEFAULT_IMAGES = [
        'design' => '/consulting/images/graphiste.png',
        'it'     => '/consulting/images/it.png',
        'mobile' => '/consulting/images/coding.png',
    ];

    public function index()
    {
        $items = ConsultingSectionImage::whereIn('section_key', self::SECTION_KEYS)->get();

        $data = collect(self::SECTION_KEYS)->mapWithKeys(function (string $key) use ($items) {
            $item = $items->firstWhere('section_key', $key);

            return [$key => $item ? $this->imageUrl($item->image_path) : null];
        });

        return response()->json(['data' => $data]);
    }

    public function update(Request $request, string $sectionKey)
    {
        abort_unless(in_array($sectionKey, self::SECTION_KEYS, true), 404);

        $data = $request->validate([
            'image' => ['required', 'image', 'max:6144'],
        ]);

        $item = ConsultingSectionImage::firstOrNew(['section_key' => $sectionKey]);

        if ($item->exists && $item->image_path && !Str::startsWith($item->image_path, ['http://', 'https://', '/'])) {
            Storage::disk('public')->delete($item->image_path);
        }

        $item->image_path = $request->file('image')->store('consulting-section-images', 'public');
        $item->save();

        return response()->json(['data' => [$sectionKey => $this->imageUrl($item->image_path)]]);
    }

    public function destroy(string $sectionKey)
    {
        abort_unless(in_array($sectionKey, self::SECTION_KEYS, true), 404);

        $item = ConsultingSectionImage::firstOrNew(['section_key' => $sectionKey]);

        if ($item->exists && $item->image_path && !Str::startsWith($item->image_path, ['http://', 'https://', '/'])) {
            Storage::disk('public')->delete($item->image_path);
        }

        $item->image_path = self::DEFAULT_IMAGES[$sectionKey];
        $item->save();

        return response()->json(['data' => [$sectionKey => $this->imageUrl($item->image_path)]]);
    }

    private function imageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Str::startsWith($path, ['http://', 'https://', '/']) ? $path : asset('storage/' . $path);
    }
}
