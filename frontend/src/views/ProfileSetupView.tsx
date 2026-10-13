import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { TargetPackage, CurrentYear } from '../types';
import {
  Mountain,
  Compass,
  Clock,
  GraduationCap,
  Sparkles,
  Check,
  Flag,
  Target,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const ProfileSetupView: React.FC = () => {
  const {
    profile,
    updateProfile,
    setActiveView,
    readinessScore,
    currentAltitudeMeters,
    eligibleCompaniesCount,
    currentCamp
  } = useApp();

  const [savedAlert, setSavedAlert] = useState(false);

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [branch, setBranch] = useState(profile.branch);
  const [currentYear, setCurrentYear] = useState<CurrentYear>(profile.currentYear);
  const [cgpa, setCgpa] = useState<number>(profile.cgpa);
  const [dailyHours, setDailyHours] = useState<number>(profile.dailyStudyHours);
  const [targetPackage, setTargetPackage] = useState<TargetPackage>(profile.targetPackage);

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'AI & Machine Learning / Data Science',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
  ];

  const years: CurrentYear[] = ['1st Year', '2nd Year', '3rd Year', 'Final Year'];

  const camps: { id: TargetPackage; title: string; campName: string; altitude: string; roleType: string; accentColor: string }[] = [
    {
      id: '10 LPA',
      title: '10 LPA',
      campName: 'Base Camp Expedition',
      altitude: '2,500m',
      roleType: 'Product Analyst, Associate Software Engineer at established firms & startups',
      accentColor: 'from-slate-500 to-indigo-500',
    },
    {
      id: '15 LPA',
      title: '15 LPA',
      campName: 'High Ridge Camp',
      altitude: '5,500m',
      roleType: 'Fullstack / Systems Engineer at scale-ups & tech unicorns (e.g. Cisco, Oracle)',
      accentColor: 'from-indigo-500 to-cyan-500',
    },
    {
      id: '20 LPA',
      title: '20 LPA',
      campName: 'The Apex Summit (Dream Tier)',
      altitude: '8,848m',
      roleType: 'Core SDE-1 at Amazon, PhonePe, Atlassian, Goldman Sachs & Hyperscalers',
      accentColor: 'from-cyan-400 to-emerald-400',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      branch,
      currentYear,
      cgpa: Number(cgpa),
      dailyStudyHours: Number(dailyHours),
      targetPackage,
    });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Expedition Trailhead Calibration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            Expedition Goals & Student Telemetry
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Configure your academic background, study pacing, and target altitude camp to recalibrate your personalized climbing roadmap.
          </p>
        </div>

        {/* Live Altitude & Readiness Stats */}
        <div className="flex items-center gap-3">
          <div className="glass-panel p-3.5 rounded-2xl text-center border border-white/[0.08] min-w-[120px]">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Current Altitude
            </p>
            <p className="text-xl font-mono font-black text-cyan-400">
              {currentAltitudeMeters.toLocaleString()}m
            </p>
          </div>
          <div className="glass-panel p-3.5 rounded-2xl text-center border border-white/[0.08] min-w-[120px]">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Eligible Recruiters
            </p>
            <p className="text-xl font-mono font-black text-emerald-400">
              {eligibleCompaniesCount} <span className="text-xs text-slate-400 font-normal">/ 7</span>
            </p>
          </div>
        </div>
      </div>

      {/* Save Success Alert */}
      {savedAlert && (
        <div className="glass-panel border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 px-5 py-4 rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">
              Expedition settings updated! Your altitude benchmarks, eligibility, and daily climb hours have been recalibrated.
            </span>
          </div>
          <button
            onClick={() => setActiveView('skills')}
            className="text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Review Skills &rarr;
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-10">
        
        {/* SECTION 1: Target Mountain Camp (Required by prompt) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white glacier-theme:text-slate-900">
                1. Select Target Mountain Camp (CTC Package)
              </h2>
              <p className="text-xs text-slate-400">
                The higher the altitude, the more rigorous the algorithmic and system design interview expectations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {camps.map(camp => {
              const isSelected = targetPackage === camp.id;
              return (
                <div
                  key={camp.id}
                  onClick={() => setTargetPackage(camp.id)}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-500/15 glass-panel shadow-lg glow-indigo ring-1 ring-indigo-400'
                      : 'border-white/[0.08] glass-card hover:border-slate-500 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                        {camp.altitude}
                      </span>
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-slate-600"></span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-white glacier-theme:text-slate-900">
                        {camp.title}
                      </h3>
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mt-0.5">
                        {camp.campName}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 glacier-theme:text-slate-600 leading-relaxed">
                      {camp.roleType}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400 font-semibold">
                    <span>DSA: {camp.id === '10 LPA' ? 'Medium' : camp.id === '15 LPA' ? 'Hard' : 'Apex'}</span>
                    <span>System Design: {camp.id === '20 LPA' ? 'Mandatory' : 'Optional'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Academic Background */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white glacier-theme:text-slate-900">
                2. Academic Background & Eligibility Cutoffs
              </h2>
              <p className="text-xs text-slate-400">
                Placement drives evaluate candidate eligibility using branch background and minimum CGPA criteria.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Candidate Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass-card border border-white/[0.12] text-sm text-white glacier-theme:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Arjun Sharma"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                University Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass-card border border-white/[0.12] text-sm text-white glacier-theme:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. candidate@university.edu"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Engineering Discipline / Branch
              </label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass-card border border-white/[0.12] text-sm text-white glacier-theme:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {branches.map(b => (
                  <option key={b} value={b} className="bg-slate-900 text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Current Academic Year
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {years.map(y => {
                  const isSelected = currentYear === y;
                  return (
                    <button
                      type="button"
                      key={y}
                      onClick={() => setCurrentYear(y)}
                      className={`py-2.5 px-2 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md glow-indigo'
                          : 'glass-card border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CGPA Interactive Section */}
            <div className="sm:col-span-2 glass-card rounded-2xl p-5 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                  Cumulative GPA (CGPA Cutoff Metric)
                </label>
                <p className="text-xs text-slate-400 mt-0.5">
                  Top tier recruiting partners enforce 7.5+ or 8.0+ cutoffs for initial online screening round qualification.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="5.0"
                  max="10.0"
                  step="0.05"
                  value={cgpa}
                  onChange={e => setCgpa(parseFloat(e.target.value) || 7.0)}
                  className="w-24 px-3 py-2 text-center rounded-xl glass-panel border border-white/[0.2] font-mono font-black text-xl text-white glacier-theme:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-xs font-mono font-bold text-slate-400">/ 10.0</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                  cgpa >= 8.0 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : cgpa >= 7.0 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {cgpa >= 8.0 ? 'Elite Bracket' : cgpa >= 7.0 ? 'Standard Cutoff' : 'Target Focus'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: Available Daily Study Hours (1-8 hours slider) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white glacier-theme:text-slate-900">
                3. Daily Study Capacity & Climbing Velocity
              </h2>
              <p className="text-xs text-slate-400">
                Calibrate your dedicated daily climb hours (1 to 8 hours). The algorithm dynamically allocates time across DSA, Aptitude, Projects, and Soft Skills.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Daily Study Dedication:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black font-mono text-cyan-400">
                  {dailyHours}
                </span>
                <span className="text-sm font-semibold text-slate-400">
                  hours / day
                </span>
                <span className="ml-2 text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {dailyHours >= 6 ? 'Intensive Ascent' : dailyHours >= 4 ? 'Optimal Velocity' : 'Steady Progress'}
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={dailyHours}
                onChange={e => setDailyHours(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 Hour (Base Camp Pace)</span>
                <span>4 Hours (Recommended Ridge Velocity)</span>
                <span>8 Hours (Full Apex Sprint)</span>
              </div>
            </div>

            {/* Live Distribution Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="glass-card p-3 rounded-xl border border-white/[0.06]">
                <p className="text-xs font-semibold text-slate-400">DSA & Algorithms</p>
                <p className="text-lg font-black font-mono text-indigo-400">
                  {(dailyHours * 0.4).toFixed(1)} hrs
                </p>
                <p className="text-[10px] text-slate-500">40% focus</p>
              </div>
              <div className="glass-card p-3 rounded-xl border border-white/[0.06]">
                <p className="text-xs font-semibold text-slate-400">Aptitude & Speed</p>
                <p className="text-lg font-black font-mono text-amber-400">
                  {(dailyHours * 0.2).toFixed(1)} hrs
                </p>
                <p className="text-[10px] text-slate-500">20% focus</p>
              </div>
              <div className="glass-card p-3 rounded-xl border border-white/[0.06]">
                <p className="text-xs font-semibold text-slate-400">Project / Web Dev</p>
                <p className="text-lg font-black font-mono text-cyan-400">
                  {(dailyHours * 0.25).toFixed(1)} hrs
                </p>
                <p className="text-[10px] text-slate-500">25% focus</p>
              </div>
              <div className="glass-card p-3 rounded-xl border border-white/[0.06]">
                <p className="text-xs font-semibold text-slate-400">STAR & HR</p>
                <p className="text-lg font-black font-mono text-emerald-400">
                  {(dailyHours * 0.15).toFixed(1)} hrs
                </p>
                <p className="text-[10px] text-slate-500">15% focus</p>
              </div>
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-400">
            Updating targets immediately recalculates your Altitude Radar, Command Deck, and Daily Ascent Log.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-lg glow-indigo transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Save & Recalculate Expedition Trail</span>
          </button>
        </div>

      </form>

    </div>
  );
};
