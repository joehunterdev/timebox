<?php

namespace Database\Factories;

use App\Models\Timebox;
use Illuminate\Database\Eloquent\Factories\Factory;

class TimeboxFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Timebox::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $start = $this->faker->dateTimeBetween('today 8am', 'today 3pm');
        $start->setTime($start->format('H'), $start->format('i') < 30 ? 0 : 30, 0);
        $startString = $start->format('Y-m-d H:i:s');

        $end = $this->faker->dateTimeBetween($start, 'today 3pm');
        $end->setTime($end->format('H'), $end->format('i') < 30 ? 0 : 30, 0);
        $endString = $end->format('Y-m-d H:i:s');

        return [
            'text' => $this->faker->word,
            'start' => $startString,
            'duration' => $this->faker->randomElement([30]), //, 60, 90
            'status' => $this->faker->randomElement(['todo',  'done']),
            'completed' => $this->faker->boolean,
            'end' => $endString
        ];
    }
}
