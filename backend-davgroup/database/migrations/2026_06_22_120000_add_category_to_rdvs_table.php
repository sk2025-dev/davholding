<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rdvs', function (Blueprint $table) {
            $table->string('category')->nullable()->after('service');
        });
    }

    public function down(): void
    {
        Schema::table('rdvs', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};
