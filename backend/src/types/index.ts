export type TargetPackage = '10 LPA' | '15 LPA' | '20 LPA';

export type MountainCamp = 'Base Camp (10 LPA)' | 'Ridge Camp (15 LPA)' | 'Apex Summit (20+ LPA)';

export type CurrentYear = '1st Year' | '2nd Year' | '3rd Year' | 'Final Year';

export type SkillLevel = 'Unexplored' | 'Beginner' | 'Intermediate' | 'Advanced';

export type AppTheme = 'summit-dark' | 'glacier-light';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Core CS' | 'Problem Solving' | 'Development';
  level: SkillLevel;
  requiredFor: {
    '10 LPA': SkillLevel;
    '15 LPA': SkillLevel;
    '20 LPA': SkillLevel;
  };
  description: string;
  practiceCount: number;
  recommendedHours: number;
  altitudeGainMeters: number;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  branch: string;
  currentYear: CurrentYear;
  cgpa: number;
  dailyStudyHours: number;
  targetPackage: TargetPackage;
  completedTasksCount: number;
  currentStreakDays: number;
  currentElevationMeters: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  role: string;
  ctcBracket: string;
  minCgpa: number;
  location: string;
  hiringType: 'On-Campus' | 'Off-Campus' | 'Pool Drive';
  deadlineDate: string;
  daysRemaining: number;
  logoInitial: string;
  accentColor: string;
  ascentMatchPercent: number;
  interviewStages: {
    stage: number;
    title: string;
    description: string;
  }[];
  keySkills: string[];
  resources: {
    title: string;
    url: string;
    type: 'Guide' | 'Questions' | 'Mock Test';
  }[];
}

export interface PlannerTask {
  id: string;
  domain: 'DSA' | 'Aptitude' | 'Projects' | 'Communication';
  title: string;
  durationMinutes: number;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  dueTime: string;
  timeBlock: 'Morning' | 'Afternoon' | 'Evening';
}

export interface TechnicalTopic {
  id: string;
  category: 'DSA' | 'System Design' | 'Core CS';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  coreConcepts: string[];
  codeSnippet?: string;
  sampleQuestions: {
    question: string;
    hint: string;
    frequency: 'High' | 'Very High' | 'Medium';
  }[];
}

export interface BehavioralQuestion {
  id: string;
  question: string;
  competency: string;
  starFramework: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleAnswer: string;
  userNotes?: string;
}

export type ViewType = 
  | 'landing'
  | 'dashboard'
  | 'profile'
  | 'skills'
  | 'companies'
  | 'planner'
  | 'interview-prep';
