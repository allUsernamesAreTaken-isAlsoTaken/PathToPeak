import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { ProfileSetupView } from './views/ProfileSetupView';
import { SkillsAnalyzerView } from './views/SkillsAnalyzerView';
import { CompanyExplorerView } from './views/CompanyExplorerView';
import { DailyPlannerView } from './views/DailyPlannerView';
import { InterviewPrepView } from './views/InterviewPrepView';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <main className="flex-1">
      {activeView === 'landing' && <LandingView />}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'profile' && <ProfileSetupView />}
      {activeView === 'skills' && <SkillsAnalyzerView />}
      {activeView === 'companies' && <CompanyExplorerView />}
      {activeView === 'planner' && <DailyPlannerView />}
      {activeView === 'interview-prep' && <InterviewPrepView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </AppProvider>
  );
}
