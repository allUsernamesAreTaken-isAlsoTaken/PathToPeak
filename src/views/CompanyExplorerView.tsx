import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Search,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CompanyExplorerView: React.FC = () => {
  const { companies, profile, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [cgpaFilter, setCgpaFilter] = useState<'All' | 'EligibleOnly' | '7.0+' | '7.5+' | '8.0+'>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>('phonepe');
  const [resourceModal, setResourceModal] = useState<{ company: string; title: string; type: string } | null>(null);

  const industries = [
    'All',
    'Fintech',
    'Big Tech',
    'Enterprise SaaS',
    'Enterprise Cloud',
    'Networking',
    'Consulting'
  ];

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.keySkills.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesIndustry =
        industryFilter === 'All' || company.industry.toLowerCase().includes(industryFilter.toLowerCase());

      let matchesCgpa = true;
      if (cgpaFilter === 'EligibleOnly') {
        matchesCgpa = profile.cgpa >= company.minCgpa;
      } else if (cgpaFilter === '7.0+') {
        matchesCgpa = company.minCgpa >= 7.0;
      } else if (cgpaFilter === '7.5+') {
        matchesCgpa = company.minCgpa >= 7.5;
      } else if (cgpaFilter === '8.0+') {
        matchesCgpa = company.minCgpa >= 8.0;
      }

      return matchesSearch && matchesIndustry && matchesCgpa;
    });
  }, [companies, searchQuery, industryFilter, cgpaFilter, profile.cgpa]);

  const toggleExpand = (id: string) => {
    setExpandedCompanyId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Summit Company Scouting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            Recruiter Scouting & Eligibility Matrix
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time criteria qualification against your active academic score (
            <span className="font-bold text-cyan-400 font-mono">{profile.cgpa} CGPA</span>).
          </p>
        </div>

        {/* CGPA Profile Pill */}
        <div className="flex items-center gap-3 glass-panel p-3.5 rounded-2xl border border-white/[0.08]">
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Your Academic Standing
            </p>
            <p className="text-xl font-mono font-black text-white glacier-theme:text-slate-900">
              {profile.cgpa} <span className="text-xs text-slate-400 font-normal">/ 10.0</span>
            </p>
          </div>
          <button
            onClick={() => setActiveView('profile')}
            className="text-xs font-bold px-3 py-2 rounded-xl glass-card border border-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Adjust CGPA
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search partner, role, or core skill..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl glass-card border border-white/[0.1] text-sm text-white glacier-theme:text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* CGPA Filter */}
          <div>
            <select
              value={cgpaFilter}
              onChange={e => setCgpaFilter(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl glass-card border border-white/[0.1] text-sm text-white glacier-theme:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">CGPA Requirement: All</option>
              <option value="EligibleOnly" className="bg-slate-900 text-white">✓ Qualified for My CGPA ({profile.cgpa})</option>
              <option value="7.0+" className="bg-slate-900 text-white">Cutoff: 7.0+ CGPA</option>
              <option value="7.5+" className="bg-slate-900 text-white">Cutoff: 7.5+ CGPA</option>
              <option value="8.0+" className="bg-slate-900 text-white">Cutoff: 8.0+ CGPA</option>
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <select
              value={industryFilter}
              onChange={e => setIndustryFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl glass-card border border-white/[0.1] text-sm text-white glacier-theme:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {industries.map(ind => (
                <option key={ind} value={ind} className="bg-slate-900 text-white">
                  Industry: {ind}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Filter Shortcuts */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.06] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400 font-bold">Quick Filters:</span>
            <button
              onClick={() => setCgpaFilter('EligibleOnly')}
              className={`px-3 py-1 rounded-xl font-bold transition-colors cursor-pointer ${
                cgpaFilter === 'EligibleOnly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'glass-card border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              Eligible Only
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                setCgpaFilter('All');
                setIndustryFilter('All');
              }}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
          <span className="font-mono text-slate-400">
            Showing {filteredCompanies.length} of {companies.length} recruiting partners
          </span>
        </div>
      </div>

      {/* Grid of Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.map(company => {
          const isEligible = profile.cgpa >= company.minCgpa;
          const isExpanded = expandedCompanyId === company.id;

          return (
            <div
              key={company.id}
              className={`glass-panel rounded-3xl border transition-all duration-200 overflow-hidden ${
                isEligible ? 'border-white/[0.08] hover:border-cyan-400/50 glow-indigo' : 'border-white/[0.08] hover:border-rose-400/50'
              }`}
            >
              <div className="p-6 sm:p-7 space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 text-white font-mono font-black text-base flex items-center justify-center shadow-md">
                      {company.logoInitial}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white glacier-theme:text-slate-900 leading-tight">
                        {company.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {company.industry} • {company.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 px-3 py-1 rounded-xl glass-card border border-indigo-500/20">
                      {company.ctcBracket}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 font-semibold">
                      {company.hiringType}
                    </p>
                  </div>
                </div>

                {/* Role Offering */}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Role Offering:
                  </span>
                  <p className="text-sm font-bold text-slate-200 glacier-theme:text-slate-800">
                    {company.role}
                  </p>
                </div>

                {/* Eligibility & Ascent Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg glass-card border border-white/[0.08] text-slate-300">
                    {company.minCgpa}+ CGPA
                  </span>

                  {isEligible ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Eligible: Qualified ✓
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Gap: Short by {(company.minCgpa - profile.cgpa).toFixed(2)} CGPA
                    </span>
                  )}

                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    Deadline in {company.daysRemaining} days
                  </span>
                </div>

                {/* Key Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {company.keySkills.map(skill => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

              {/* Collapsible Interview Stages */}
              <div className="border-t border-white/[0.06] bg-black/20 p-5 space-y-4">
                <button
                  onClick={() => toggleExpand(company.id)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Interview Stages ({company.interviewStages.length} Rounds) & Resource Bank</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="space-y-4 pt-2 border-t border-white/[0.06] animate-in fade-in duration-150">
                    
                    {/* Stages Timeline */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Hiring Process Rounds:
                      </h4>
                      <div className="space-y-2">
                        {company.interviewStages.map(stg => (
                          <div
                            key={stg.stage}
                            className="glass-card p-3 rounded-xl border border-white/[0.06] flex items-start gap-3"
                          >
                            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {stg.stage}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-white glacier-theme:text-slate-900">
                                {stg.title}
                              </p>
                              <p className="text-xs text-slate-300 glacier-theme:text-slate-600 mt-0.5 leading-relaxed">
                                {stg.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Curated Learning & Practice Resources:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {company.resources.map((res, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              setResourceModal({
                                company: company.name,
                                title: res.title,
                                type: res.type
                              })
                            }
                            className="glass-card hover:bg-white/[0.08] p-3 rounded-xl border border-white/[0.06] text-left transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <div className="truncate mr-2">
                              <p className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 truncate">
                                {res.title}
                              </p>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {res.type}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Resource Modal */}
      {resourceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl max-w-md w-full p-6 space-y-4 border border-white/[0.15] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">
                  Placement Resource
                </h3>
              </div>
              <button
                onClick={() => setResourceModal(null)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div>
              <p className="text-xs text-cyan-400 font-mono font-bold uppercase">
                {resourceModal.company} • {resourceModal.type}
              </p>
              <h4 className="text-base font-extrabold text-white mt-1">
                {resourceModal.title}
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Verified candidate archive containing previous online assessment challenges, test cases, and time limit rubrics verified by placed alumni.
              </p>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setResourceModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Accessing: ${resourceModal.title}`);
                  setResourceModal(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 text-white cursor-pointer"
              >
                Open Study Material
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
