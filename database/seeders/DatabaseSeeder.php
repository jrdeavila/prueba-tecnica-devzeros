<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::Create([
            'name' => 'admin',
            'email' => 'test@mail.com',
            'password' => bcrypt('test1234'),
        ]);
        $this->call(BookSeeder::class);
    }
}
