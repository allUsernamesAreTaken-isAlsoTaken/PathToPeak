import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type {
  StudentProfile,
  SkillItem,
  Company,
  PlannerTask,
  TargetPackage,
  SkillLevel,
  ViewType,
  AppTheme,
  MountainCamp
} from '../types';
import {
  initialStudentProfile,
  initialSkills,
  mockCompanies,
  initialDailyTasks
} from '../data/mockData';

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  theme: AppTheme;
  toggleTheme: () => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  skills: SkillItem[];
  updateSkillLevel: (skillId: string, level: SkillLevel) => void;
  companies: Company[];
  tasks: PlannerTask[];
  toggleTask: (taskId: string) => void;
  addTask: (
    domain: PlannerTask['domain'],
    title: string,
    durationMinutes: number,
    priority: PlannerTask['priority'],
    timeBlock?: PlannerTask['timeBlock']
  ) => void;
  deleteTask: (taskId: string) => void;
  
  // Derived state
  readinessScore: number;
  skillsMasteredCount: number;
  currentAltitudeMeters: number;
  currentCamp: MountainCamp;
  priorityGaps: {
    skill: SkillItem;
    current: SkillLevel;
    required: SkillLevel;
    gapSeverity: 'High' | 'Medium' | 'Low';
    metersBehind: number;
  }[];
  hoursAllocation: {
    dsaHours: number;
    aptitudeHours: number;
    projectHours: number;
    communicationHours: number;
  };
  eligibleCompaniesCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const levelNumericMap: Record<SkillLevel, number> = {
  'Unexplored': 0,
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('landing');
  const [theme, setTheme] = useState<AppTheme>('summit-dark');
  const [profile, setProfile] = useState<StudentProfile>(initialStudentProfile);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [companies] = useState<Company[]>(mockCompanies);
  const [tasks, setTasks] = useState<PlannerTask[]>(initialDailyTasks);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'summit-dark' ? 'glacier-light' : 'summit-dark'));
  };

  useEffect(() => {
    if (theme === 'glacier-light') {
      document.documentElement.classList.add('glacier-theme');
    } else {
      document.documentElement.classList.remove('glacier-theme');
    }
  }, [theme]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateSkillLevel = (skillId: string, level: SkillLevel) => {
    setSkills(prev =>
      prev.map(item => (item.id === skillId ? { ...item, level } : item))
    );
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            setProfile(p => ({
              ...p,
              completedTasksCount: p.completedTasksCount + 1,
              currentElevationMeters: Math.min(8848, p.currentElevationMeters + 85),
            }));
          } else {
            setProfile(p => ({
              ...p,
              completedTasksCount: Math.max(0, p.completedTasksCount - 1),
              currentElevationMeters: Math.max(1500, p.currentElevationMeters - 85),
            }));
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  const addTask = (
    domain: PlannerTask['domain'],
    title: string,
    durationMinutes: number,
    priority: PlannerTask['priority'],
    timeBlock: PlannerTask['timeBlock'] = 'Morning'
  ) => {
    const newTask: PlannerTask = {
      id: `task-${Date.now()}`,
      domain,
      title,
      durationMinutes,
      completed: false,
      priority,
      dueTime: timeBlock === 'Morning' ? '11:00 AM' : timeBlock === 'Afternoon' ? '04:00 PM' : '08:30 PM',
      timeBlock,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Skill Gaps, Altitude & Readiness Calculation
  const { priorityGaps, skillsMasteredCount, readinessScore, currentAltitudeMeters, currentCamp } = useMemo(() => {
    const target = profile.targetPackage;
    let totalScore = 0;
    let maxPossibleScore = 0;
    let masteredCount = 0;
    let totalGainedElevation = 2000; // Base Camp starts at 2,000m
    const gaps: AppContextType['priorityGaps'] = [];

    skills.forEach(skill => {
      const currentVal = levelNumericMap[skill.level];
      const requiredLevel = skill.requiredFor[target];
      const requiredVal = levelNumericMap[requiredLevel];

      maxPossibleScore += Math.max(1, requiredVal);
      totalScore += Math.min(currentVal, requiredVal);

      // Add elevation gained
      totalGainedElevation += currentVal * (skill.altitudeGainMeters / 3);

      if (currentVal >= requiredVal && requiredVal > 0) {
        masteredCount++;
      } else if (currentVal < requiredVal) {
        const diff = requiredVal - currentVal;
        gaps.push({
          skill,
          current: skill.level,
          required: requiredLevel,
          gapSeverity: diff >= 2 ? 'High' : 'Medium',
          metersBehind: Math.round(diff * (skill.altitudeGainMeters / 2)),
        });
      }
    });

    const skillRatio = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0.5;
    const cgpaRatio = Math.min(1, Math.max(0, (profile.cgpa - 6.0) / 4.0));
    const hoursRatio = Math.min(1, profile.dailyStudyHours / 6.0);

    const calculatedPct = Math.round(
      (skillRatio * 70) + (cgpaRatio * 20) + (hoursRatio * 10)
    );

    const finalReadiness = Math.min(99, Math.max(25, calculatedPct));
    const finalAltitude = Math.min(8848, Math.round(1500 + (finalReadiness / 100) * 7348));

    let camp: MountainCamp = 'Base Camp (10 LPA)';
    if (finalAltitude >= 7200) {
      camp = 'Apex Summit (20+ LPA)';
    } else if (finalAltitude >= 4500) {
      camp = 'Ridge Camp (15 LPA)';
    }

    return {
      priorityGaps: gaps,
      skillsMasteredCount: masteredCount,
      readinessScore: finalReadiness,
      currentAltitudeMeters: finalAltitude,
      currentCamp: camp,
    };
  }, [skills, profile.targetPackage, profile.cgpa, profile.dailyStudyHours]);

  // Derived Hours Allocation
  const hoursAllocation = useMemo(() => {
    const total = profile.dailyStudyHours;
    return {
      dsaHours: Number((total * 0.40).toFixed(1)),
      aptitudeHours: Number((total * 0.20).toFixed(1)),
      projectHours: Number((total * 0.25).toFixed(1)),
      communicationHours: Number((total * 0.15).toFixed(1)),
    };
  }, [profile.dailyStudyHours]);

  const eligibleCompaniesCount = useMemo(() => {
    return companies.filter(c => profile.cgpa >= c.minCgpa).length;
  }, [companies, profile.cgpa]);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        theme,
        toggleTheme,
        profile,
        updateProfile,
        skills,
        updateSkillLevel,
        companies,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        readinessScore,
        skillsMasteredCount,
        currentAltitudeMeters,
        currentCamp,
        priorityGaps,
        hoursAllocation,
        eligibleCompaniesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
