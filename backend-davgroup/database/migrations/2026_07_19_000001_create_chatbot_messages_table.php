<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chatbot_messages', function (Blueprint $table) {
            $table->id();
            $table->string('session_id', 100)->index();
            $table->string('page', 255)->nullable();
            $table->text('question');
            $table->text('answer');
            $table->string('intent', 80)->nullable()->index();
            $table->boolean('understood')->default(false)->index();
            $table->boolean('helpful')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chatbot_messages');
    }
};
