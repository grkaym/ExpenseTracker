<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class DemoController extends Controller
{
    /**
     * Login as the demo user
     */
    public function login(Request $request)
    {
        // Generate the Demo user's record from session ID
        $sid = $request->session()->getId();
        $email = "demo+{$sid}@example.com";
        $user = User::firstOrCreate(
            ['email' => $email],
            ['name' => 'Demo'.substr($sid, 0, 6), 'password' => bcrypt(Str::random(32))]
        );

        // Generate the demo data with factory
        $expenseCats = Category::type('expense')->forUser($user->id)->get();
        $incomeCats = Category::type('income')->forUser($user->id)->get();
        Transaction::factory()
            ->expense()
            ->recycle($expenseCats)
            ->count(50)
            ->create(['user_id' => $user->id]);
        Transaction::factory()
            ->income()
            ->recycle($incomeCats)
            ->count(50)
            ->create(['user_id' => $user->id]);

        // Login as a demo user
        Auth::login($user);
        // Regenerate to prevent a session fixation attack
        $request->session()->regenerate();
        // Keep flags on the session to recognize that this is a demo session
        session(['is_demo' => true, 'demo_user_id' => $user->id]);

        // Redirect to the dashbaord
        return redirect()->route('dashboard');
    }

    /**
     * Logout the demo user
     */
    public function logout(Request $request): RedirectResponse
    {
        // Get the logout user's model
        $user = Auth::user();

        // Logout the user
        Auth::logout();
        // Invalidate session
        $request->session()->invalidate();
        // Regenerate CSRF Token
        $request->session()->regenerateToken();

        // Delete the user.
        // Related transactions and categories will also be deleted automatically
        // because of the foreign key constraints with cascadeOnDelete.
        $user->delete();

        // Redirect to the root page
        return redirect('/');
    }
}
