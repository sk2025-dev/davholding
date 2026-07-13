<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consulting_realisations', function (Blueprint $table) {
            $table->id();
            $table->string('category')->index(); // branding | developpement | design
            $table->string('tag')->nullable();
            $table->string('title');
            $table->string('image_path')->nullable();
            $table->json('tags')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consulting_realisations');
    }
};
