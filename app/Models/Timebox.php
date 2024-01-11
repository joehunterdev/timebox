<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timebox extends Model
{
    protected $fillable = ['text','status', 'completed','duration','start','end','order'];

    use HasFactory;
}
