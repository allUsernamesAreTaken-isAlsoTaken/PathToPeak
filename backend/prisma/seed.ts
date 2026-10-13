import { PrismaClient } from '@prisma/client';
import {
  initialStudentProfile,
  initialSkills,
  mockCompanies,
  initialDailyTasks
} from '../src/data/seedData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PathToPeak database...');

  // 1. Seed Profile
  await prisma.studentProfile.upsert({
    where: { id: 'default-profile' },
    update: {
      fullName: initialStudentProfile.fullName,
      email: initialStudentProfile.email,
      branch: initialStudentProfile.branch,
      currentYear: initialStudentProfile.currentYear,
      cgpa: initialStudentProfile.cgpa,
      dailyStudyHours: initialStudentProfile.dailyStudyHours,
      targetPackage: initialStudentProfile.targetPackage,
      completedTasksCount: initialStudentProfile.completedTasksCount,
      currentStreakDays: initialStudentProfile.currentStreakDays,
      currentElevationMeters: initialStudentProfile.currentElevationMeters,
    },
    create: {
      id: 'default-profile',
      fullName: initialStudentProfile.fullName,
      email: initialStudentProfile.email,
      branch: initialStudentProfile.branch,
      currentYear: initialStudentProfile.currentYear,
      cgpa: initialStudentProfile.cgpa,
      dailyStudyHours: initialStudentProfile.dailyStudyHours,
      targetPackage: initialStudentProfile.targetPackage,
      completedTasksCount: initialStudentProfile.completedTasksCount,
      currentStreakDays: initialStudentProfile.currentStreakDays,
      currentElevationMeters: initialStudentProfile.currentElevationMeters,
    },
  });
  console.log('✔ Student profile seeded');

  // 2. Seed Skills
  for (const s of initialSkills) {
    await prisma.skill.upsert({
      where: { id: s.id },
      update: {
        name: s.name,
        category: s.category,
        level: s.level,
        requiredFor: JSON.stringify(s.requiredFor),
        description: s.description,
        practiceCount: s.practiceCount,
        recommendedHours: s.recommendedHours,
        altitudeGainMeters: s.altitudeGainMeters,
      },
      create: {
        id: s.id,
        name: s.name,
        category: s.category,
        level: s.level,
        requiredFor: JSON.stringify(s.requiredFor),
        description: s.description,
        practiceCount: s.practiceCount,
        recommendedHours: s.recommendedHours,
        altitudeGainMeters: s.altitudeGainMeters,
      },
    });
  }
  console.log(`✔ ${initialSkills.length} Skills seeded`);

  // 3. Seed Companies
  for (const c of mockCompanies) {
    await prisma.company.upsert({
      where: { id: c.id },
      update: {
        name: c.name,
        industry: c.industry,
        role: c.role,
        ctcBracket: c.ctcBracket,
        minCgpa: c.minCgpa,
        location: c.location,
        hiringType: c.hiringType,
        deadlineDate: c.deadlineDate,
        daysRemaining: c.daysRemaining,
        logoInitial: c.logoInitial,
        accentColor: c.accentColor,
        ascentMatchPercent: c.ascentMatchPercent,
        interviewStages: JSON.stringify(c.interviewStages),
        keySkills: JSON.stringify(c.keySkills),
        resources: JSON.stringify(c.resources),
      },
      create: {
        id: c.id,
        name: c.name,
        industry: c.industry,
        role: c.role,
        ctcBracket: c.ctcBracket,
        minCgpa: c.minCgpa,
        location: c.location,
        hiringType: c.hiringType,
        deadlineDate: c.deadlineDate,
        daysRemaining: c.daysRemaining,
        logoInitial: c.logoInitial,
        accentColor: c.accentColor,
        ascentMatchPercent: c.ascentMatchPercent,
        interviewStages: JSON.stringify(c.interviewStages),
        keySkills: JSON.stringify(c.keySkills),
        resources: JSON.stringify(c.resources),
      },
    });
  }
  console.log(`✔ ${mockCompanies.length} Companies seeded`);

  // 4. Seed Tasks
  for (const t of initialDailyTasks) {
    await prisma.plannerTask.upsert({
      where: { id: t.id },
      update: {
        domain: t.domain,
        title: t.title,
        durationMinutes: t.durationMinutes,
        completed: t.completed,
        priority: t.priority,
        dueTime: t.dueTime,
        timeBlock: t.timeBlock,
      },
      create: {
        id: t.id,
        domain: t.domain,
        title: t.title,
        durationMinutes: t.durationMinutes,
        completed: t.completed,
        priority: t.priority,
        dueTime: t.dueTime,
        timeBlock: t.timeBlock,
      },
    });
  }
  console.log(`✔ ${initialDailyTasks.length} Planner tasks seeded`);

  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
