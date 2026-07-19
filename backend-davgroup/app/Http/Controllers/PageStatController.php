<?php

namespace App\Http\Controllers;

use App\Models\PageStat;
use Illuminate\Http\Request;

class PageStatController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => PageStat::orderByDesc('view_count')->get(),
        ]);
    }

    public function record(Request $request)
    {
        $data = $request->validate([
            'path' => ['required', 'string', 'max:255', 'regex:/^\\//'],
            'title' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'in:view,share,capture'],
        ]);

        $stat = PageStat::firstOrCreate(
            ['path' => strtok($data['path'], '?')],
            ['title' => $data['title'] ?? null],
        );
        $column = $data['type'].'_count';
        $stat->title = $data['title'] ?? $stat->title;
        $stat->last_activity_at = now();
        $stat->save();
        $stat->increment($column);

        return response()->json(['recorded' => true], 202);
    }
}
