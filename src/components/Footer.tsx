import React from 'react';
import { useApp } from '../context/AppContext';
import { Mountain, Compass, ShieldCheck, Flag, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="glass-panel border-t border-white/[0.08] mt-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          
          {/* Brand & Expedition Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white glacier-theme:text-slate-900 tracking-tight">
                PathTo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Peak</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision algorithmic placement ascent engine. Navigating engineering students from Base Camp foundation to 20+ LPA Apex Summit Dream Offers.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>Current Summit Target: 8,848m</span>
            </div>
          </div>

          {/* Expedition Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 glacier-theme:text-slate-800 mb-4 font-mono">
              Ascent Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveView('skills')} className="hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer transition-colors">
                  <span>Technical Altitude Radar</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('companies')} className="hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer transition-colors">
                  <span>Summit Company Scouting</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('planner')} className="hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer transition-colors">
                  <span>Daily Ascent Log & Focus Timer</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('interview-prep')} className="hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer transition-colors">
                  <span>Apex Interview & STAR Vault</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
            </ul>
          </div>

          {/* Elevation Camps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 glacier-theme:text-slate-800 mb-4 font-mono">
              Placement Elevation Camps
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 ring-2 ring-indigo-500/30"></span>
                <div>
                  <span className="font-bold text-slate-200 glacier-theme:text-slate-800">Apex Summit (20+ LPA)</span>
                  <p className="text-[10px] text-slate-400">FAANG, Elite FinTech, Hyperscale</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-cyan-400/30"></span>
                <div>
                  <span className="font-bold text-slate-200 glacier-theme:text-slate-800">Ridge Camp (15 LPA)</span>
                  <p className="text-[10px] text-slate-400">Unicorns, High-Growth Enterprise</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                <div>
                  <span className="font-bold text-slate-200 glacier-theme:text-slate-800">Base Camp (10 LPA)</span>
                  <p className="text-[10px] text-slate-400">Fast-Track Dream Start</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expedition Protocol */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 glacier-theme:text-slate-800 mb-4 font-mono">
              Ascent Guarantees
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Flag className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Verified Interview Archives from Placed Alumni</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Adaptive Telemetry Algorithm based on OA Pass Rates</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PathToPeak. Built for engineers scaling to the apex.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Expedition Code</span>
            <span className="hover:text-slate-300 cursor-pointer">Telemetry Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Placement Cell Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
