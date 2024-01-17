<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timebox extends Model
{
    protected $fillable = ['text', 'status', 'completed', 'duration', 'start', 'end', 'order', 'user_id'];

    use HasFactory;

    /**
     * Get the user that owns the timebox.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
