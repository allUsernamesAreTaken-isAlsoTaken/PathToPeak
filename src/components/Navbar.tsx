import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ViewType } from '../types';
import {
  Compass,
  LayoutDashboard,
  Mountain,
  Sliders,
  Building2,
  CalendarDays,
  GraduationCap,
  Flame,
  Sun,
  Moon,
  Menu,
  X,
  Target
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    profile,
    readinessScore,
    currentAltitudeMeters,
    currentCamp,
    theme,
    toggleTheme
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Ascent Map', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Command Deck', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'profile', label: 'Expedition Goal', icon: <Mountain className="w-3.5 h-3.5" /> },
    { id: 'skills', label: 'Altitude Radar', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'companies', label: 'Summit Scouting', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'planner', label: 'Ascent Planner', icon: <CalendarDays className="w-3.5 h-3.5" /> },
    { id: 'interview-prep', label: 'Apex Vault', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (viewId: ViewType) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  const isDark = theme === 'summit-dark';

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md glow-indigo group-hover:scale-105 transition-transform">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white glacier-theme:text-slate-900">
                  PathTo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-black">Peak</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  8,848m
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Placement Ascent Engine
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 p-1.5 rounded-2xl bg-white/[0.03] glacier-theme:bg-slate-100 border border-white/[0.06] glacier-theme:border-slate-200">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/30 to-cyan-500/20 text-white glacier-theme:bg-white glacier-theme:text-indigo-600 border border-indigo-400/40 shadow-xs'
                      : 'text-slate-400 hover:text-white glacier-theme:hover:text-slate-900 hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Live Summit Telemetry & Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Live Altitude Meter Pill */}
            <div
              title="Current Placement Elevation"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 glacier-theme:bg-slate-100 border border-white/[0.08] glacier-theme:border-slate-200 text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="font-mono font-bold text-cyan-300 glacier-theme:text-cyan-700">
                {currentAltitudeMeters.toLocaleString()}m
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold border-l border-slate-700 glacier-theme:border-slate-300 pl-1.5">
                {currentCamp.split(' ')[0]}
              </span>
            </div>

            {/* Streak Pill */}
            <div
              title="Consecutive Days Ascent Streak"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 glacier-theme:text-amber-800 text-xs font-bold"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{profile.currentStreakDays}d streak</span>
            </div>

            {/* Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Glacier Light' : 'Switch to Summit Night'}
              className="p-2 rounded-xl bg-white/[0.05] glacier-theme:bg-slate-100 border border-white/[0.08] glacier-theme:border-slate-200 text-slate-300 glacier-theme:text-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* User Profile Pill */}
            <button
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/30 hover:border-indigo-400 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {profile.fullName.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white glacier-theme:text-slate-900 leading-none">
                  {profile.fullName.split(' ')[0]}
                </p>
                <p className="text-[10px] text-indigo-400 font-semibold">
                  {readinessScore}% Summit
                </p>
              </div>
            </button>

          </div>

          {/* Mobile Menu & Theme Switcher Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/[0.05] text-slate-300 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-t border-white/[0.08] px-4 pt-3 pb-5 space-y-2">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.06] text-xs">
            <span className="font-semibold text-slate-300">
              Target: {profile.targetPackage}
            </span>
            <span className="font-mono text-cyan-400 font-bold">
              Altitude: {currentAltitudeMeters}m ({readinessScore}%)
            </span>
          </div>
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/30 text-white border border-indigo-500/40'
                    : 'text-slate-300 hover:bg-white/[0.05]'
                }`}
              >
                <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
