<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Timebox;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user
        User::create([
            'name' => 'Admin',
            'email' => 'me@joehunter.dev',
            'password' => Hash::make("t3st"), 
         ]);

        // Create an user
        User::create([
            'name' => 'Joey',
            'email' => 'joe.hunter.dev@gmail.com',
            'password' => Hash::make("t3st2"), 
         ]);
        Timebox::factory()->count(5)->create();
 
    }
}
