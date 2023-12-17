<?php

namespace App\Http\Controllers;

use App\Interfaces\ScheduleRepositoryInterface;

class ScheduleController extends Controller
{
    protected $scheduleRepository;

    public function __construct(ScheduleRepositoryInterface $scheduleRepository)
    {
        $this->scheduleRepository = $scheduleRepository;
    }

    public function index()
    {
        $schedules = $this->scheduleRepository->getAll();
        return response()->json($schedules);
    }
}
