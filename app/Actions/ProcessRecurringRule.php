<?php
namespace App\Actions;

use App\Models\RecurringRule;
use App\Models\Transaction;
use Carbon\Carbon;

class ProcessRecurringRule {
    public function __invoke()
    {
        // Get all user's recurring rules except for demo user's one
        $allRecurringRules = RecurringRule::nonDemoUser()->get();

        // Current date
        $currentDate = Carbon::now();

        foreach($allRecurringRules as $r) {
            // $next_run_date is cast to the datetime type (Carbon)
            $nextRunDate = $r->next_run_date;

            // Compare the current date with next_run_date
            if($currentDate >= $nextRunDate) {
                // Create transactions when next_run_date is due
                $t = new Transaction();
                $t->user_id = $r->user_id;
                $t->category_id = $r->category_id;
                $t->date = $currentDate;
                $t->type = $r->type;
                $t->amount = $r->amount;
                $t->note = $r->note;
                $t->recurring_id = $r->id;
                $t->save();

                // Set next_run_date according to the frequency value
                switch ($r->frequency) {
                    case 'daily': $r->next_run_date = $currentDate->addDay();
                        break;
                    case 'weekly': $r->next_run_date = $currentDate->addWeek();
                        break;
                    case 'monthly': $r->next_run_date = $currentDate->addMonth();
                        break;
                    default:
                }

                // Reset next_run_date
                $r->save();
            }
        }
    }
}