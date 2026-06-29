<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rdvs', function (Blueprint $table) {
            $table->string('paydunya_token')->nullable()->after('is_notified');
            $table->string('payment_status')->default('pending')->after('paydunya_token');
            $table->decimal('deposit_amount', 10, 2)->default(5000)->after('payment_status');
            $table->string('payment_method')->nullable()->after('deposit_amount');
        });
    }

    public function down(): void
    {
        Schema::table('rdvs', function (Blueprint $table) {
            $table->dropColumn(['paydunya_token', 'payment_status', 'deposit_amount', 'payment_method']);
        });
    }
};
