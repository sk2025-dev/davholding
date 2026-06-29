<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('paydunya_token')->nullable()->after('payment_method');
            $table->string('paydunya_receipt')->nullable()->after('paydunya_token');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['paydunya_token', 'paydunya_receipt']);
        });
    }
};
