<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class DemoController extends Controller
{
    public function index(Request $request)
    {
        // Generate Demo user's record from session ID.
        $sid = $request->session()->getId();
        $email = "demo+{$sid}@example.com";
        $user = User::firstOrCreate(
            ['email' => $email],
            ['name' => 'Demo'.substr($sid, 0, 6), 'password' => bcrypt(Str::random(32))]
        );

        // Generate demo data with factory.
        $expenseCats = Category::where('type', 'expense')
            ->where(function ($q) use ($user) {
                $q->whereNull('user_id')
                    ->orWhere('user_id', $user->id);
            })
            ->get();
        $incomeCats = Category::where('type', 'income')
            ->where(function ($q) use ($user) {
                $q->whereNull('user_id')
                    ->orWhere('user_id', $user->id);
            })
            ->get();
        Transaction::factory()
            ->expense()
            ->recycle($expenseCats)
            ->count(10)
            ->create(['user_id' => $user->id]);
        Transaction::factory()
            ->income()
            ->recycle($incomeCats)
            ->count(10)
            ->create(['user_id' => $user->id]);

        // Login as a demo user.
        Auth::login($user);
        // Regenerate to prevent a session fixation attack.
        $request->session()->regenerate();
        // Keep flags on session to recognize that this session is demo.
        session(['is_demo' => true, 'demo_user_id' => $user->id]);

        return redirect()->route('dashboard');
    }
}
