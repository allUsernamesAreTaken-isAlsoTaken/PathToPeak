import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Mountain,
  Flame,
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  Sliders,
  GraduationCap,
  Building2,
  Flag
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    profile,
    skills,
    companies,
    tasks,
    setActiveView,
    readinessScore,
    currentAltitudeMeters,
    currentCamp,
    skillsMasteredCount,
    priorityGaps,
    eligibleCompaniesCount,
    hoursAllocation
  } = useApp();

  const pendingTasks = tasks.filter(t => !t.completed);
  const nextTask = pendingTasks[0] || tasks[0];

  const upcomingDeadlines = [...companies]
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome & Elevation Cockpit Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono">
            <span className="text-xs font-bold text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-500/30">
              Welcome back, {profile.fullName.split(' ')[0]}
            </span>
            <span className="text-xs text-slate-400">
              • {profile.branch} ({profile.currentYear})
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            Summit Command Deck & Ascent Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('profile')}
            className="text-xs font-mono font-bold px-4 py-2.5 rounded-2xl glass-card border border-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Adjust Goal ({profile.targetPackage})
          </button>
          <button
            onClick={() => setActiveView('planner')}
            className="text-xs font-bold px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md glow-indigo transition-colors cursor-pointer"
          >
            Today's Climbing Plan
          </button>
        </div>
      </div>

      {/* TOP 4 COCKPIT METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Current Altitude & Readiness */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Current Altitude
            </span>
            <span className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
              <Mountain className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-cyan-400">
                {currentAltitudeMeters.toLocaleString()}m
              </span>
              <span className="text-xs font-mono text-slate-400">
                / 8,848m
              </span>
            </div>
            <div className="w-full bg-slate-900/80 h-2 rounded-full mt-3 overflow-hidden border border-white/[0.06]">
              <div
                className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${readinessScore}%` }}
              ></div>
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-2 font-semibold">
              {readinessScore}% — {currentCamp.split(' ')[0]} Status
            </p>
          </div>
        </div>

        {/* Metric 2: Cleared Competencies */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Cleared Skills
            </span>
            <span className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-emerald-400">
                {skillsMasteredCount} <span className="text-lg text-slate-500 font-normal">/ {skills.length}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              Meeting benchmark for {profile.targetPackage}
            </p>
          </div>
        </div>

        {/* Metric 3: Active Streak (Sunrise Amber Flame) */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Climbing Streak
            </span>
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-amber-400">
                {profile.currentStreakDays} <span className="text-lg text-slate-400 font-normal">Days</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {profile.completedTasksCount} total ascent tasks logged
            </p>
          </div>
        </div>

        {/* Metric 4: Target Camp & Scouted Recruiters */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Target Camp
            </span>
            <span className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Flag className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white glacier-theme:text-slate-900">
                {profile.targetPackage}
              </span>
            </div>
            <p className="text-[11px] text-cyan-400 mt-2 font-mono font-semibold">
              Eligible for {eligibleCompaniesCount} scouting partners
            </p>
          </div>
        </div>

      </div>

      {/* "NEXT ASCENT OBJECTIVE" BANNER */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 glow-indigo flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Highest Priority Ridge Action</span>
          </div>
          
          <h2 className="text-2xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            {priorityGaps.length > 0 
              ? `Bridge Altitude Crevasse: ${priorityGaps[0].skill.name}`
              : nextTask 
              ? nextTask.title
              : 'Complete Daily Review Sprint'
            }
          </h2>

          <p className="text-slate-300 glacier-theme:text-slate-600 text-xs sm:text-sm leading-relaxed">
            {priorityGaps.length > 0
              ? `Elevate your ${priorityGaps[0].skill.name} from ${priorityGaps[0].current} to ${priorityGaps[0].required} to unlock Tier-1 recruiting eligibility and gain +${priorityGaps[0].skill.altitudeGainMeters}m elevation. ~${priorityGaps[0].skill.recommendedHours} hrs needed.`
              : 'You are on track with your core technical benchmarks! Continue your daily momentum in the planner.'
            }
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setActiveView('planner')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-extrabold text-xs shadow-md glow-indigo transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Jump to Daily Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveView('skills')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl glass-card border border-white/[0.12] text-white glacier-theme:text-slate-900 font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Inspect Crevasses</span>
          </button>
        </div>
      </div>

      {/* TWO COLUMN GRID: Upcoming Scouting Windows + Today's Schedule Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* UPCOMING COMPANY DEADLINES */}
        <div className="lg:col-span-2 glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div>
              <h2 className="text-lg font-black text-white glacier-theme:text-slate-900">
                Upcoming Recruiter Windows & Online Assessments
              </h2>
              <p className="text-xs text-slate-400">
                Campus recruitment drives and screening assessment portals closing soon.
              </p>
            </div>
            <button
              onClick={() => setActiveView('companies')}
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({companies.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map(company => {
              const isEligible = profile.cgpa >= company.minCgpa;
              const isUrgent = company.daysRemaining <= 7;

              return (
                <div
                  key={company.id}
                  className="p-4 rounded-2xl glass-card border border-white/[0.06] hover:border-white/[0.15] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {company.logoInitial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-white glacier-theme:text-slate-900">
                          {company.name}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {company.ctcBracket}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {company.role} • {company.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto font-mono">
                    {isEligible ? (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Eligible ✓
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Gap (req {company.minCgpa})
                      </span>
                    )}

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                        isUrgent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'glass-card border-white/[0.08] text-slate-400'
                      }`}
                    >
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {company.daysRemaining}d left
                    </span>

                    <button
                      onClick={() => setActiveView('companies')}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl glass-panel hover:bg-white/[0.08] text-white cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WORKLOAD DISTRIBUTION & SHORTCUTS */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-base font-bold text-white glacier-theme:text-slate-900">
                Daily Workload Slices
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                {profile.dailyStudyHours}h / day
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-2xl glass-card border border-white/[0.06]">
                <span className="text-slate-300">DSA & Algorithms</span>
                <span className="font-bold text-indigo-400">{hoursAllocation.dsaHours} hrs</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl glass-card border border-white/[0.06]">
                <span className="text-slate-300">Aptitude & Speed</span>
                <span className="font-bold text-amber-400">{hoursAllocation.aptitudeHours} hrs</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl glass-card border border-white/[0.06]">
                <span className="text-slate-300">Projects & Web Dev</span>
                <span className="font-bold text-cyan-400">{hoursAllocation.projectHours} hrs</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl glass-card border border-white/[0.06]">
                <span className="text-slate-300">STAR & Behavioral</span>
                <span className="font-bold text-emerald-400">{hoursAllocation.communicationHours} hrs</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] space-y-2">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Expedition Shortcuts:
              </p>
              <button
                onClick={() => setActiveView('interview-prep')}
                className="w-full flex items-center justify-between p-3 rounded-2xl glass-card hover:bg-white/[0.08] text-xs font-bold text-slate-200 border border-white/[0.08] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>STAR Behavioral Framework Studio</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => setActiveView('skills')}
                className="w-full flex items-center justify-between p-3 rounded-2xl glass-card hover:bg-white/[0.08] text-xs font-bold text-slate-200 border border-white/[0.08] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>Update Technical Altitude Radar</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-center">
            <span className="text-[11px] font-mono text-slate-500">
              Calibrated for 2026/27 Placement Drives
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
