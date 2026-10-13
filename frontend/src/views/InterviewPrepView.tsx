import React, { useState } from 'react';
import {
  mockTechnicalTopics,
  mockBehavioralQuestions
} from '../data/mockData';
import type { BehavioralQuestion } from '../types';
import {
  GraduationCap,
  Code2,
  Users,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Save,
  BookmarkCheck,
  Terminal,
  Copy,
  Check
} from 'lucide-react';

export const InterviewPrepView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral'>('technical');
  const [techCategory, setTechCategory] = useState<string>('All');
  const [expandedTechId, setExpandedTechId] = useState<string | null>('tech-dsa-trees');
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const [questions, setQuestions] = useState<BehavioralQuestion[]>(mockBehavioralQuestions);
  const [expandedBehavioralId, setExpandedBehavioralId] = useState<string | null>('beh-conflict');
  const [savedNotesAlert, setSavedNotesAlert] = useState<string | null>(null);

  const toggleTechExpand = (id: string) => {
    setExpandedTechId(prev => (prev === id ? null : id));
  };

  const toggleHint = (questionIndex: string) => {
    setRevealedHints(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const toggleBehavioralExpand = (id: string) => {
    setExpandedBehavioralId(prev => (prev === id ? null : id));
  };

  const handleNotesChange = (id: string, notes: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, userNotes: notes } : q))
    );
  };

  const handleSaveNotes = (id: string) => {
    setSavedNotesAlert(id);
    setTimeout(() => setSavedNotesAlert(null), 2500);
  };

  const filteredTech = mockTechnicalTopics.filter(
    t => techCategory === 'All' || t.category === techCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Apex Interview Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white glacier-theme:text-slate-900 tracking-tight">
            Technical Architectures & STAR Story Studio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Master high-frequency algorithmic problem patterns, core systems architecture, and structured STAR HR answers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/[0.1] gap-1.5 shadow-md">
          <button
            onClick={() => setActiveTab('technical')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'technical'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Technical Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('behavioral')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'behavioral'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md glow-indigo'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>STAR Studio (HR)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TECHNICAL PREPARATION */}
      {activeTab === 'technical' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Category:
              </span>
              {(['All', 'DSA', 'System Design', 'Core CS'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setTechCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    techCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md glow-indigo'
                      : 'glass-card border-white/[0.08] text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">
              Showing {filteredTech.length} High-Yield Modules
            </span>
          </div>

          <div className="space-y-4">
            {filteredTech.map(topic => {
              const isExpanded = expandedTechId === topic.id;
              return (
                <div
                  key={topic.id}
                  className="glass-panel rounded-3xl border border-white/[0.08] overflow-hidden transition-all"
                >
                  {/* Topic Title Bar */}
                  <div
                    onClick={() => toggleTechExpand(topic.id)}
                    className="p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg font-black text-white glacier-theme:text-slate-900">
                          {topic.title}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                          {topic.category}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            topic.difficulty === 'Hard'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : topic.difficulty === 'Medium'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {topic.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-cyan-400 hidden sm:block">
                        {topic.sampleQuestions.length} Problems
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 sm:px-7 pb-7 pt-2 border-t border-white/[0.06] space-y-6 bg-black/20">
                      
                      {/* Concepts */}
                      <div>
                        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Core Concepts & Patterns:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {topic.coreConcepts.map((concept, i) => (
                            <div
                              key={i}
                              className="glass-card p-3 rounded-xl border border-white/[0.06] flex items-center gap-2 text-xs text-slate-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                              <span>{concept}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Code Snippet if present */}
                      {topic.codeSnippet && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                              Production Algorithm Template:
                            </span>
                            <button
                              onClick={() => copyCode(topic.codeSnippet!, topic.id)}
                              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedSnippet === topic.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Snippet</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-4 rounded-2xl bg-slate-950 border border-white/[0.1] text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                            {topic.codeSnippet}
                          </pre>
                        </div>
                      )}

                      {/* Sample Questions */}
                      <div>
                        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Verified Interview Questions & Strategic Hints:
                        </h4>
                        <div className="space-y-3">
                          {topic.sampleQuestions.map((q, idx) => {
                            const hintKey = `${topic.id}-${idx}`;
                            const isHintVisible = revealedHints[hintKey];

                            return (
                              <div
                                key={idx}
                                className="glass-card p-4 rounded-2xl border border-white/[0.06] space-y-2.5"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <p className="text-xs font-bold text-white glacier-theme:text-slate-900 leading-snug">
                                      {q.question}
                                    </p>
                                  </div>
                                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                                    {q.frequency} Ask Rate
                                  </span>
                                </div>

                                <div className="pt-1">
                                  <button
                                    onClick={() => toggleHint(hintKey)}
                                    className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Lightbulb className="w-3.5 h-3.5" />
                                    <span>{isHintVisible ? 'Hide Strategy Hint' : 'Reveal Strategy Hint'}</span>
                                  </button>
                                </div>

                                {isHintVisible && (
                                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-200 font-mono animate-in fade-in duration-150">
                                    <strong className="text-amber-400">Algorithmic Hint: </strong>
                                    {q.hint}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: BEHAVIORAL STAR STUDIO */}
      {activeTab === 'behavioral' && (
        <div className="space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-white glacier-theme:text-slate-900">
                The STAR Framework Methodology
              </h2>
              <p className="text-xs text-slate-300 glacier-theme:text-slate-600 max-w-2xl leading-relaxed">
                Elite engineering hiring committees assess leadership principles using{' '}
                <strong className="text-cyan-400 font-mono">Situation</strong>,{' '}
                <strong className="text-amber-400 font-mono">Task</strong>,{' '}
                <strong className="text-indigo-400 font-mono">Action</strong>, and{' '}
                <strong className="text-emerald-400 font-mono">Result</strong>.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
              <BookmarkCheck className="w-4 h-4 text-cyan-400" />
              <span>4 Proven Core Scenarios</span>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map(item => {
              const isExpanded = expandedBehavioralId === item.id;
              return (
                <div
                  key={item.id}
                  className="glass-panel rounded-3xl border border-white/[0.08] overflow-hidden transition-all"
                >
                  <div
                    onClick={() => toggleBehavioralExpand(item.id)}
                    className="p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.competency}
                      </span>
                      <h3 className="text-base font-extrabold text-white glacier-theme:text-slate-900 mt-1">
                        {item.question}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 hidden sm:block">
                        {isExpanded ? 'Collapse' : 'Expand STAR'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 sm:px-7 pb-7 pt-2 border-t border-white/[0.06] space-y-6 bg-black/20">
                      
                      {/* STAR 4 Pillars */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="glass-card p-4 rounded-2xl border border-white/[0.06] space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-black text-xs flex items-center justify-center border border-indigo-500/30">
                              S
                            </span>
                            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                              Situation
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.starFramework.situation}
                          </p>
                        </div>

                        <div className="glass-card p-4 rounded-2xl border border-white/[0.06] space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-black text-xs flex items-center justify-center border border-amber-500/30">
                              T
                            </span>
                            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                              Task
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.starFramework.task}
                          </p>
                        </div>

                        <div className="glass-card p-4 rounded-2xl border border-white/[0.06] space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-black text-xs flex items-center justify-center border border-cyan-500/30">
                              A
                            </span>
                            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                              Action (Your Initiative)
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.starFramework.action}
                          </p>
                        </div>

                        <div className="glass-card p-4 rounded-2xl border border-white/[0.06] space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-black text-xs flex items-center justify-center border border-emerald-500/30">
                              R
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                              Result (Quantifiable Impact)
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.starFramework.result}
                          </p>
                        </div>

                      </div>

                      {/* Spoken Sample */}
                      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          60-Second Spoken Pitch Template:
                        </span>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed italic">
                          "{item.sampleAnswer}"
                        </p>
                      </div>

                      {/* Notes Editor */}
                      <div className="glass-card p-4 rounded-2xl border border-white/[0.08] space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                            My Personal Experience & Metrics Notes:
                          </label>
                          {savedNotesAlert === item.id && (
                            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Saved to Vault!
                            </span>
                          )}
                        </div>

                        <textarea
                          rows={3}
                          value={item.userNotes || ''}
                          onChange={e => handleNotesChange(item.id, e.target.value)}
                          placeholder="Jot down specific teammates, metrics, and technologies for your interview..."
                          className="w-full px-4 py-3 rounded-2xl glass-panel border border-white/[0.1] text-xs text-white glacier-theme:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                        />

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSaveNotes(item.id)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save My STAR Notes</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
