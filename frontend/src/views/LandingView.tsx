import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { TargetPackage } from '../types';
import {
  Mountain,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Flame,
  Zap,
  CheckCircle2,
  Cpu,
  CalendarDays,
  GraduationCap,
  Building2,
  ChevronRight,
  Flag
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setActiveView, profile, readinessScore, currentAltitudeMeters, updateProfile } = useApp();
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'skills' | 'planner' | 'companies' | 'star'>('skills');

  const camps: { id: TargetPackage; label: string; altitude: string; target: string; desc: string }[] = [
    {
      id: '10 LPA',
      label: 'Base Camp',
      altitude: '2,500m',
      target: '10 LPA',
      desc: 'Solid core CS foundations, IT Services prime drives & Product startups',
    },
    {
      id: '15 LPA',
      label: 'Ridge Camp',
      altitude: '5,500m',
      target: '15 LPA',
      desc: 'High-growth unicorns, heavy Trees/DP algorithmic interviews & fullstack',
    },
    {
      id: '20 LPA',
      label: 'The Apex Summit',
      altitude: '8,848m',
      target: '20+ LPA',
      desc: 'FAANG, Tier-1 FinTech, distributed system design & low-latency architecture',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION: Split-Stage Mountain Ascent Header */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-500/15 via-cyan-500/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission & Interactive Trailhead */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Ascent Sprint Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Expedition 2026/27 • Live Placement Ascent</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">8,848m Target</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white glacier-theme:text-slate-900 tracking-tight leading-[1.12]">
              Scale the Placement Summit to Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
                20+ LPA Dream Offer
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 glacier-theme:text-slate-600 leading-relaxed max-w-2xl font-normal">
              Stop guessing your placement readiness. PathToPeak measures your exact technical altitude, flags critical skill crevasses before campus drives, and crafts an adaptive climbing plan tuned to your dream CTC target.
            </p>

            {/* Interactive Target Altitude Trailhead */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Choose Your Target Mountain Camp:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {camps.map(camp => {
                  const isSelected = profile.targetPackage === camp.id;
                  return (
                    <button
                      key={camp.id}
                      onClick={() => updateProfile({ targetPackage: camp.id })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'glass-panel border-indigo-400/80 bg-indigo-500/15 shadow-md glow-indigo ring-1 ring-indigo-400'
                          : 'glass-card border-white/[0.08] hover:border-slate-500 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {camp.altitude}
                        </span>
                        {isSelected && <Flag className="w-3.5 h-3.5 text-indigo-400" />}
                      </div>
                      <p className="text-sm font-black text-white glacier-theme:text-slate-900">
                        {camp.target}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {camp.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setActiveView('profile')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-lg glow-indigo transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
                <span>Configure My Ascent Trail</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl glass-panel border border-white/[0.12] hover:border-white/[0.25] text-white glacier-theme:text-slate-800 font-bold text-sm transition-all cursor-pointer"
              >
                <span>Open Command Deck</span>
                <span className="text-xs px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-semibold">
                  {readinessScore}% Ready
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Live Altitude Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.12] glow-indigo space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white">
                    <Mountain className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white glacier-theme:text-slate-900">
                      Live Ascent Gauge
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      GPS Altitude Sensor
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  {currentAltitudeMeters.toLocaleString()}m / 8,848m
                </span>
              </div>

              {/* Altitude Progress Visualizer */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span className="text-slate-400">Base Camp (0m)</span>
                  <span className="text-indigo-400">Ridge (5,500m)</span>
                  <span className="text-cyan-300">Apex (8,848m)</span>
                </div>
                <div className="w-full bg-slate-900/80 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
                  <div
                    className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${readinessScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="glass-card p-3.5 rounded-xl border border-white/[0.06]">
                  <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                    Ascent Readiness
                  </p>
                  <p className="text-2xl font-black text-white glacier-theme:text-slate-900 mt-0.5">
                    {readinessScore}%
                  </p>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                    High Camp Qualified
                  </p>
                </div>

                <div className="glass-card p-3.5 rounded-xl border border-white/[0.06]">
                  <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                    Daily Pacing
                  </p>
                  <p className="text-2xl font-black text-white glacier-theme:text-slate-900 mt-0.5">
                    {profile.dailyStudyHours}h
                  </p>
                  <p className="text-[10px] text-cyan-400 font-semibold mt-0.5">
                    {profile.dailyStudyHours * 7}h / week climb
                  </p>
                </div>
              </div>

              {/* Next Ascent Objective Banner */}
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono block">
                    Next Ridge Milestone:
                  </span>
                  <p className="font-bold text-white glacier-theme:text-slate-900">
                    Master Binary Tree LCA & Dynamic Programming
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('planner')}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors"
                >
                  Climb &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Ascent Telemetry Ribbon */}
        <div className="max-w-7xl mx-auto pt-16 mt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-black text-white glacier-theme:text-slate-900 font-mono">
              98.4%
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Summit Offer Pass Rate
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-cyan-400 font-mono">
              450+
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Scouting Company Partners
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-mono">
              ₹18.4 LPA
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Average Dream Package
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-amber-400 font-mono flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-amber-400 text-amber-400" />
              14 Days
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Avg Active Climbing Streak
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ASCENT SHOWCASE: Replacing generic cards with a functional explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Expedition Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            Engineered To Overcome Every Placement Obstacle
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Test drive the core engine components below to see how PathToPeak transforms your daily placement preparation.
          </p>
        </div>

        {/* Showcase Switcher Pills */}
        <div className="flex justify-center flex-wrap gap-2">
          {[
            { id: 'skills', label: '1. Skill Crevasse Radar', icon: <Cpu className="w-4 h-4" /> },
            { id: 'planner', label: '2. Daily Ascent Slices', icon: <CalendarDays className="w-4 h-4" /> },
            { id: 'companies', label: '3. Company Scouting Matrix', icon: <Building2 className="w-4 h-4" /> },
            { id: 'star', label: '4. STAR Interview Studio', icon: <GraduationCap className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveShowcaseTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeShowcaseTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md glow-indigo'
                  : 'glass-card border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Showcase Panel */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.12] glow-indigo">
          
          {/* TAB 1: Skill Crevasse Radar */}
          {activeShowcaseTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Telemetry Module 01
                </span>
                <h3 className="text-2xl font-black text-white glacier-theme:text-slate-900">
                  Real-Time Skill Crevasse Analysis
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 glacier-theme:text-slate-600 leading-relaxed">
                  Most candidates fail online assessments because they don't know which specific algorithms or CS fundamentals are holding them back. PathToPeak pinpoints each deficit with required study hours and altitude gain values.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Dynamic comparisons against 10, 15, and 20 LPA requirements</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>One-click sync with your daily ascent task list</span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('skills')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    <span>Launch Altitude Radar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Interactive Radar Visual Card */}
              <div className="glass-card rounded-2xl p-5 border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-400">Target: {profile.targetPackage}</span>
                  <span className="text-cyan-400">Altitude Calibrated</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">DSA: Trees & Graphs</p>
                      <p className="text-[10px] text-slate-400">Current: Intermediate • Need: Advanced</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      -450m Crevasse
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">System Design (HLD)</p>
                      <p className="text-[10px] text-slate-400">Current: Beginner • Need: Intermediate</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      -320m Crevasse
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">C++ Memory & STL</p>
                      <p className="text-[10px] text-slate-400">Current: Advanced • Need: Advanced</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✓ Cleared (8,848m)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Daily Ascent Slices */}
          {activeShowcaseTab === 'planner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Telemetry Module 02
                </span>
                <h3 className="text-2xl font-black text-white glacier-theme:text-slate-900">
                  Adaptive Time-Sliced Climbing Log
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 glacier-theme:text-slate-600 leading-relaxed">
                  Your daily hours slider dynamically fractions time into DSA (40%), Aptitude (20%), Projects (25%), and Communication (15%). Integrated with a Pomodoro Ascent Focus timer.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('planner')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    <span>Open Ascent Planner</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white">Today's Daily Schedule Distribution</span>
                  <span className="font-mono text-cyan-400">{profile.dailyStudyHours} hrs allocated</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <span className="text-slate-400 text-[10px]">DSA (40%)</span>
                    <p className="text-lg font-black text-indigo-400 mt-1">{(profile.dailyStudyHours * 0.4).toFixed(1)} hrs</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <span className="text-slate-400 text-[10px]">Aptitude (20%)</span>
                    <p className="text-lg font-black text-amber-400 mt-1">{(profile.dailyStudyHours * 0.2).toFixed(1)} hrs</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <span className="text-slate-400 text-[10px]">Projects (25%)</span>
                    <p className="text-lg font-black text-cyan-400 mt-1">{(profile.dailyStudyHours * 0.25).toFixed(1)} hrs</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <span className="text-slate-400 text-[10px]">STAR & HR (15%)</span>
                    <p className="text-lg font-black text-emerald-400 mt-1">{(profile.dailyStudyHours * 0.15).toFixed(1)} hrs</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Company Scouting */}
          {activeShowcaseTab === 'companies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Telemetry Module 03
                </span>
                <h3 className="text-2xl font-black text-white glacier-theme:text-slate-900">
                  Summit Company Scouting Matrix
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 glacier-theme:text-slate-600 leading-relaxed">
                  Real-time CGPA cutoffs, interview stage pipelines, and compensation benchmarks for top campus recruiters like PhonePe, Amazon, Atlassian, Oracle, and Goldman Sachs.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('companies')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    <span>Explore Companies</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/[0.08] space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-sm">PhonePe</span>
                    <span className="font-mono text-xs font-bold text-indigo-400">₹22 - 28 LPA</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Software Development Engineer - I</p>
                  <div className="flex items-center gap-2 pt-1 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">7.5+ CGPA (Eligible ✓)</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">4 Interview Rounds</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STAR Interview Studio */}
          {activeShowcaseTab === 'star' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Telemetry Module 04
                </span>
                <h3 className="text-2xl font-black text-white glacier-theme:text-slate-900">
                  Apex Interview STAR Vault
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 glacier-theme:text-slate-600 leading-relaxed">
                  Master both core technical problems with executable algorithm snippets and the STAR framework (Situation, Task, Action, Result) with your own personal editable response notebook.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('interview-prep')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    <span>Open Apex Vault</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/[0.08] space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="font-bold text-indigo-400 font-mono">[S] Situation:</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">High-traffic hackathon service hit 504 gateway timeouts 2h before demo.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="font-bold text-cyan-400 font-mono">[A] Action:</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">Isolated connection leaks, implemented singleton DB pooling & pre-commit hooks.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="font-bold text-emerald-400 font-mono">[R] Result:</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">0% error rate under 500 concurrent demo requests, secured 2nd place.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* EXPEDITION READY CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-indigo-500/30 glow-indigo relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
              <Mountain className="w-3.5 h-3.5" />
              <span>Ready for the 8,848m Summit?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
              Start your placement ascent today.
            </h3>
            <p className="text-slate-300 glacier-theme:text-slate-600 text-xs sm:text-sm leading-relaxed">
              Calibrate your current academic CGPA, diagnose your exact skill gap against 20 LPA bars, and start climbing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveView('profile')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer text-center"
            >
              Start Free Expedition
            </button>
            <button
              onClick={() => setActiveView('companies')}
              className="px-6 py-3.5 rounded-2xl glass-card border border-white/[0.15] text-slate-200 hover:text-white font-bold text-sm transition-all cursor-pointer text-center"
            >
              Scout Companies
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
