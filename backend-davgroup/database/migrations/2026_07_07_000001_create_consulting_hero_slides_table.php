<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consulting_hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('tag')->nullable();
            $table->string('tab_label');
            $table->text('headline');
            $table->string('headline_highlight')->nullable();
            $table->text('subtitle')->nullable();
            $table->json('bullets')->nullable();
            $table->string('cta_primary_label')->default('Démarrer un projet');
            $table->string('cta_primary_link')->default('#contact');
            $table->string('cta_secondary_label')->nullable();
            $table->string('cta_secondary_link')->nullable();
            $table->string('image_path')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consulting_hero_slides');
    }
};
