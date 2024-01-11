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
        Schema::create('timeboxes', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->timestamp('start')->useCurrent();
            $table->string('status')->default("todo");
            $table->integer('duration')->default(30);
            $table->timestamp('end')->useCurrent();
            $table->integer('order')->default(0);
            $table->boolean('completed')->default(false);
            $table->timestamps();
            $table->softDeletes();
            //$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            //$table->unsignedBigInteger('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timeboxes');
    }
};
