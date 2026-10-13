import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { PlannerTask } from '../types';
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  Flame,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Mountain,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';

export const DailyPlannerView: React.FC = () => {
  const {
    profile,
    tasks,
    toggleTask,
    addTask,
    deleteTask,
    hoursAllocation,
    currentAltitudeMeters
  } = useApp();

  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState<PlannerTask['domain']>('DSA');
  const [newDuration, setNewDuration] = useState<number>(45);
  const [newPriority, setNewPriority] = useState<PlannerTask['priority']>('High');
  const [newTimeBlock, setNewTimeBlock] = useState<PlannerTask['timeBlock']>('Morning');

  // Focus Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerPreset, setTimerPreset] = useState<'25m' | '50m' | '15m'>('25m');

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const setPreset = (preset: '25m' | '50m' | '15m') => {
    setTimerRunning(false);
    setTimerPreset(preset);
    if (preset === '25m') setTimerSeconds(25 * 60);
    else if (preset === '50m') setTimerSeconds(50 * 60);
    else setTimerSeconds(15 * 60);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newDomain, newTitle.trim(), Number(newDuration), newPriority, newTimeBlock);
    setNewTitle('');
    setShowAddModal(false);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalMinutesAllocated = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);
  const completedMinutes = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.durationMinutes, 0);
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const domains = ['All', 'DSA', 'Aptitude', 'Projects', 'Communication'];

  const filteredTasks = tasks.filter(
    t => selectedDomain === 'All' || t.domain === selectedDomain
  );

  const daysOfWeek = [
    { day: 'Mon', completed: true, hours: 4.2 },
    { day: 'Tue', completed: true, hours: 3.8 },
    { day: 'Wed', completed: true, hours: 4.5 },
    { day: 'Thu', completed: true, hours: 4.0 },
    { day: 'Fri', completed: false, hours: 2.5, current: true },
    { day: 'Sat', completed: false, hours: 0 },
    { day: 'Sun', completed: false, hours: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
            <span>Adaptive Ascent Scheduling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            Daily Ascent Schedule & Focus Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Workload balancing calibrated to your dedicated{' '}
            <span className="font-bold text-cyan-400 font-mono">{profile.dailyStudyHours} hours/day</span> climbing velocity.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-md glow-indigo transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Ascent Task</span>
        </button>
      </div>

      {/* Domain Allocation Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* DSA */}
        <div className="glass-panel rounded-3xl p-5 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              DSA & Algorithms
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">40%</span>
          </div>
          <p className="text-2xl font-black font-mono text-white glacier-theme:text-slate-900">
            {hoursAllocation.dsaHours} <span className="text-xs text-slate-400 font-normal">hrs</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Trees, DP, Graphs & LeetCode Mediums
          </p>
        </div>

        {/* Aptitude */}
        <div className="glass-panel rounded-3xl p-5 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Aptitude & Speed
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">20%</span>
          </div>
          <p className="text-2xl font-black font-mono text-white glacier-theme:text-slate-900">
            {hoursAllocation.aptitudeHours} <span className="text-xs text-slate-400 font-normal">hrs</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Quant probability, logic reasoning
          </p>
        </div>

        {/* Projects */}
        <div className="glass-panel rounded-3xl p-5 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Projects & Web Dev
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">25%</span>
          </div>
          <p className="text-2xl font-black font-mono text-white glacier-theme:text-slate-900">
            {hoursAllocation.projectHours} <span className="text-xs text-slate-400 font-normal">hrs</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Microservices, REST APIs, System Design
          </p>
        </div>

        {/* Communication */}
        <div className="glass-panel rounded-3xl p-5 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              STAR & HR
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">15%</span>
          </div>
          <p className="text-2xl font-black font-mono text-white glacier-theme:text-slate-900">
            {hoursAllocation.communicationHours} <span className="text-xs text-slate-400 font-normal">hrs</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            STAR framework & mock speech rehearsal
          </p>
        </div>

      </div>

      {/* Progress & Focus Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Milestone Progress */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white glacier-theme:text-slate-900">
                Ascent Consistency & Habit Streak
              </h2>
              <p className="text-xs text-slate-400">
                Scaling to the 8,848m summit requires relentless daily discipline.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{profile.currentStreakDays} Consecutive Days</span>
            </div>
          </div>

          {/* Today's completion bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span className="text-slate-300">Today's Schedule Progress:</span>
              <span className="text-cyan-400">{completionPercentage}% ({completedCount}/{tasks.length} Tasks)</span>
            </div>
            <div className="w-full bg-slate-900/80 h-3 rounded-full overflow-hidden border border-white/[0.08]">
              <div
                className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>{completedMinutes} mins completed</span>
              <span>{totalMinutesAllocated} mins scheduled today</span>
            </div>
          </div>

          {/* Day Calendar */}
          <div className="pt-2">
            <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              Weekly Ascent Telemetry:
            </p>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map(d => (
                <div
                  key={d.day}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    d.current
                      ? 'border-cyan-400/80 bg-cyan-500/10 ring-2 ring-cyan-400/30'
                      : d.completed
                      ? 'glass-card border-indigo-500/30 bg-indigo-500/10 text-white'
                      : 'glass-card border-white/[0.04] text-slate-500'
                  }`}
                >
                  <p className="text-xs font-bold font-mono">{d.day}</p>
                  <div className="my-1.5 flex justify-center">
                    {d.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <p className="text-[10px] font-mono font-semibold text-slate-400">
                    {d.hours > 0 ? `${d.hours}h` : '-'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Peak Focus Pomodoro Companion */}
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between space-y-4 glow-indigo">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white glacier-theme:text-slate-900">
                Peak Focus Timer
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Distraction-free sprint timer for algorithmic focus.
            </p>

            {/* Presets */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {(['25m', '50m', '15m'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    timerPreset === p
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'glass-card text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="my-6 text-center">
              <div className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-white tracking-wider">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-[11px] font-mono font-bold text-cyan-400 mt-2 uppercase tracking-wider">
                {timerRunning ? 'Ascent Sprint in Progress' : 'Ready to Climb'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                timerRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md'
              }`}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{timerRunning ? 'Pause Sprint' : 'Start Focus Sprint'}</span>
            </button>
            <button
              onClick={() => setPreset(timerPreset)}
              className="p-3 rounded-2xl glass-card border border-white/[0.1] hover:bg-white/[0.08] text-slate-400 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Task Checklist Section */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white glacier-theme:text-slate-900">
              Today's Ascent Tasks Checklist
            </h2>
            <p className="text-xs text-slate-400">
              Check off completed challenges to gain elevation altitude toward the 8,848m summit.
            </p>
          </div>

          {/* Domain Filter */}
          <div className="flex flex-wrap gap-1 glass-card p-1 rounded-2xl border border-white/[0.08]">
            {domains.map(dom => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDomain === dom
                    ? 'bg-indigo-600 text-white shadow-md glow-indigo'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No tasks scheduled in this domain. Click "Add Custom Ascent Task" above.
            </div>
          ) : (
            filteredTasks.map(task => {
              const isDone = task.completed;
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isDone
                      ? 'glass-card border-white/[0.04] opacity-60'
                      : 'glass-panel border-white/[0.08] hover:border-cyan-400/40 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isDone
                          ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-xs'
                          : 'border-2 border-slate-600 hover:border-cyan-400 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div className="flex-1">
                      <p
                        className={`text-sm transition-all ${
                          isDone
                            ? 'line-through text-slate-500'
                            : 'text-white glacier-theme:text-slate-900 font-bold'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                        <span className="font-semibold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                          {task.domain}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {task.durationMinutes} mins
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-medium">{task.timeBlock}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        task.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : task.priority === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl max-w-md w-full p-6 space-y-4 border border-white/[0.15] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-white text-base">
                Schedule New Ascent Task
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Task Description
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Solve 3 LeetCode Medium DP challenges"
                  className="w-full px-4 py-2.5 rounded-2xl glass-card border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Domain
                  </label>
                  <select
                    value={newDomain}
                    onChange={e => setNewDomain(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-2xl glass-card border border-white/[0.1] text-xs font-semibold text-white cursor-pointer"
                  >
                    <option value="DSA" className="bg-slate-900">DSA</option>
                    <option value="Aptitude" className="bg-slate-900">Aptitude</option>
                    <option value="Projects" className="bg-slate-900">Projects</option>
                    <option value="Communication" className="bg-slate-900">Communication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    step="5"
                    value={newDuration}
                    onChange={e => setNewDuration(parseInt(e.target.value) || 30)}
                    className="w-full px-3 py-2.5 rounded-2xl glass-card border border-white/[0.1] text-xs font-semibold text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Time Block
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Morning', 'Afternoon', 'Evening'] as const).map(b => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setNewTimeBlock(b)}
                      className={`py-2 text-center text-xs font-bold rounded-xl border cursor-pointer ${
                        newTimeBlock === b
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'glass-card border-white/[0.08] text-slate-400'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md cursor-pointer"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
