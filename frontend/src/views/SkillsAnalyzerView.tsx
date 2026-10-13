import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { SkillLevel, SkillItem } from '../types';
import {
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Mountain,
  Compass,
  Zap,
  TrendingUp,
  Flame,
  ArrowRight
} from 'lucide-react';

export const SkillsAnalyzerView: React.FC = () => {
  const {
    skills,
    updateSkillLevel,
    profile,
    updateProfile,
    priorityGaps,
    skillsMasteredCount,
    readinessScore,
    currentAltitudeMeters,
    addTask
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [taskAddedSkill, setTaskAddedSkill] = useState<string | null>(null);

  const categories = ['All', 'Languages', 'Problem Solving', 'Core CS', 'Development'];
  const levels: SkillLevel[] = ['Unexplored', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredSkills = skills.filter(
    s => selectedCategory === 'All' || s.category === selectedCategory
  );

  const handleCreateTaskFromGap = (skill: SkillItem) => {
    addTask(
      skill.category === 'Problem Solving' ? 'DSA' : 'Projects',
      `Scale Altitude Crevasse: ${skill.name} pattern mastery (+${skill.altitudeGainMeters}m)`,
      60,
      'High',
      'Morning'
    );
    setTaskAddedSkill(skill.id);
    setTimeout(() => setTaskAddedSkill(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner / Goal Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold mb-2">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Technical Altitude Radar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            Skill Crevasse Diagnostics & Calibration
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Contrasting your current competencies against benchmark expectations for{' '}
            <span className="font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20 font-mono">
              {profile.targetPackage}
            </span>.
          </p>
        </div>

        {/* Trailhead Camp Selector */}
        <div className="flex items-center gap-2 glass-panel p-2 rounded-2xl border border-white/[0.08]">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pl-2">
            Target Altitude:
          </span>
          {(['10 LPA', '15 LPA', '20 LPA'] as const).map(pkg => (
            <button
              key={pkg}
              onClick={() => updateProfile({ targetPackage: pkg })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                profile.targetPackage === pkg
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md glow-indigo'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {pkg}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Telemetry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Metric 1: Current Altitude */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Current Altitude
            </p>
            <p className="text-3xl font-black font-mono text-cyan-400 mt-1">
              {currentAltitudeMeters.toLocaleString()}m
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {readinessScore}% towards 8,848m Apex
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Mountain className="w-7 h-7" />
          </div>
        </div>

        {/* Metric 2: Skills Mastered */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Cleared Competencies
            </p>
            <p className="text-3xl font-black font-mono text-emerald-400 mt-1">
              {skillsMasteredCount} <span className="text-base text-slate-500 font-semibold">/ {skills.length}</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Meeting benchmark standards
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
        </div>

        {/* Metric 3: Critical Gaps */}
        <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Crevasse Deficits
            </p>
            <p className="text-3xl font-black font-mono text-rose-400 mt-1">
              {priorityGaps.length} <span className="text-xs text-slate-500 font-normal">Deficits</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Flagged for climb training
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
        </div>

      </div>

      {/* PRIORITY MISSING CREVASSES SECTION */}
      <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white glacier-theme:text-slate-900">
                Critical Crevasse Deficits & Altitude Lag
              </h2>
              <p className="text-xs text-slate-400">
                Skills where your current proficiency falls below the {profile.targetPackage} screening requirements.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {priorityGaps.length} Action Items
          </span>
        </div>

        {priorityGaps.length === 0 ? (
          <div className="p-8 text-center glass-card rounded-2xl border border-emerald-500/30 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-300">
              All Skills Meet or Exceed {profile.targetPackage} Criteria!
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Outstanding climbing discipline. You are primed to clear technical screening rounds. Consider setting your sight on the 20+ LPA Apex Summit!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {priorityGaps.map(gap => {
              const isHigh = gap.gapSeverity === 'High';
              return (
                <div
                  key={gap.skill.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    isHigh
                      ? 'glass-card border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50'
                      : 'glass-card border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-lg border ${
                        isHigh
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {isHigh ? 'High Crevasse' : 'Moderate Crevasse'}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        +{gap.skill.altitudeGainMeters}m gain
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-white glacier-theme:text-slate-900">
                      {gap.skill.name}
                    </h4>

                    <p className="text-xs text-slate-300 glacier-theme:text-slate-600 line-clamp-2">
                      {gap.skill.description}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Current Level:</span>
                        <span className="font-bold text-white">{gap.current}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Required Bar:</span>
                        <span className="font-bold text-cyan-400">{gap.required}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleCreateTaskFromGap(gap.skill)}
                      disabled={taskAddedSkill === gap.skill.id}
                      className={`w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        taskAddedSkill === gap.skill.id
                          ? 'bg-emerald-600 text-white'
                          : 'glass-panel hover:bg-white/[0.08] text-white border border-white/[0.12]'
                      }`}
                    >
                      {taskAddedSkill === gap.skill.id ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Added to Daily Log!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add Training Task to Daily Log</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* INTERACTIVE SKILL MATRIX */}
      <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white glacier-theme:text-slate-900">
              Interactive Competency Calibration Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Toggle your level for each technology to see instant updates to your altitude and placement readiness score.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 glass-card p-1 rounded-2xl border border-white/[0.08]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md glow-indigo'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Rows */}
        <div className="space-y-3">
          {filteredSkills.map(skill => {
            const requiredLevel = skill.requiredFor[profile.targetPackage];
            const isQualified = levels.indexOf(skill.level) >= levels.indexOf(requiredLevel);

            return (
              <div
                key={skill.id}
                className="p-5 rounded-2xl glass-card border border-white/[0.06] hover:border-white/[0.14] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="lg:max-w-md space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-black text-white glacier-theme:text-slate-900">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                      {skill.category}
                    </span>
                    {isQualified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Qualified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        <AlertTriangle className="w-3 h-3" />
                        Crevasse
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 glacier-theme:text-slate-600">
                    {skill.description}
                  </p>
                  <p className="text-[11px] font-mono text-cyan-400 font-medium">
                    +{skill.altitudeGainMeters}m altitude gain potential • {skill.practiceCount} problems solved
                  </p>
                </div>

                {/* Target Requirement Info */}
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs font-mono text-center">
                  <span className="text-slate-400 block text-[10px]">
                    {profile.targetPackage} Bar:
                  </span>
                  <span className="font-bold text-cyan-400">
                    {requiredLevel}
                  </span>
                </div>

                {/* Interactive Level Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {levels.map(lvl => {
                    const isCurrent = skill.level === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => updateSkillLevel(skill.id, lvl)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md glow-indigo ring-1 ring-cyan-400'
                            : 'glass-panel border-white/[0.08] text-slate-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
