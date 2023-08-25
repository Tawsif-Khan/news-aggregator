<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('fetch-news:newsapi')->daily()
            ->sendOutputTo(storage_path('logs/fetch-news-newsapi.log'));
        $schedule->command('fetch-news:nytimes')->daily()
            ->sendOutputTo(storage_path('logs/fetch-news-nytimes.log'));
        $schedule->command('fetch-news:theguardian')->daily()
            ->sendOutputTo(storage_path('logs/fetch-news-theguardian.log'));
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
