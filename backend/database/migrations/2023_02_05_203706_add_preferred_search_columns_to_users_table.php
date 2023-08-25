<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->json('preferred_categories')->after('password')->nullable();
            $table->json('preferred_sources')->after('preferred_categories')->nullable();
            $table->json('preferred_authors')->after('preferred_sources')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('preferred_categories');
            $table->dropColumn('preferred_sources');
            $table->dropColumn('preferred_authors');
        });
    }
};
