<?php
namespace App\Actions;

use App\Models\User;
use Carbon\Carbon;

class DeleteDemoData
{
    public function __invoke()
    {
        // Valid for 60 minutes
        $validUntil = Carbon::now()->subMinute(60);

        // Delete target users
        User::where('is_demo', true)
            ->where('created_at', '<=', $validUntil)
            ->delete();
    }
}