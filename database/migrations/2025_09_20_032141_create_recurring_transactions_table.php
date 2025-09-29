<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recurring_transactions', function (Blueprint $table) {
            $table->id();
            // Transaction data
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['expense', 'income']);
            $table->decimal('amount', 12, 2);
            $table->string('note', 255)->nullable();

            // Recurring settings
            $table->date('start_date');
            $table->enum('frequency', ['daily', 'weekly', 'monthly']);
            $table->string('timezone', 64)->default(config('app.timezone', 'Asia/Tokyo'));
            $table->enum('status', ['active', 'paused'])->default('active');

            // Internal data
            $table->date('next_run_date');
            $table->timestamp('last_generated_at')->nullable();

            $table->timestamps();
        });

        // Link transactions to the recurring from which they were generated
        Schema::table('transactions', function(BluePrint $table) {
            $table->foreignId('recurring_id')
                ->nullable()
                ->constrained('recurring_transactions')
                ->nullOnDelete();
            // Avoid duplicate transactions
            $table->unique(['recurring_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recurring_transactions');
    }
};
