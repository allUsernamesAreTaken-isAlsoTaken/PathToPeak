import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';

export const profileRouter = Router();

// GET /api/profile
profileRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { id: 'default-profile' },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Internal server error fetching profile' });
  }
});

// PUT /api/profile
profileRouter.put('/', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      branch,
      currentYear,
      cgpa,
      dailyStudyHours,
      targetPackage,
      completedTasksCount,
      currentStreakDays,
      currentElevationMeters,
    } = req.body;

    const updated = await prisma.studentProfile.upsert({
      where: { id: 'default-profile' },
      update: {
        ...(fullName !== undefined && { fullName }),
        ...(email !== undefined && { email }),
        ...(branch !== undefined && { branch }),
        ...(currentYear !== undefined && { currentYear }),
        ...(cgpa !== undefined && { cgpa: Number(cgpa) }),
        ...(dailyStudyHours !== undefined && { dailyStudyHours: Number(dailyStudyHours) }),
        ...(targetPackage !== undefined && { targetPackage }),
        ...(completedTasksCount !== undefined && { completedTasksCount: Number(completedTasksCount) }),
        ...(currentStreakDays !== undefined && { currentStreakDays: Number(currentStreakDays) }),
        ...(currentElevationMeters !== undefined && { currentElevationMeters: Number(currentElevationMeters) }),
      },
      create: {
        id: 'default-profile',
        fullName: fullName || 'Arjun Sharma',
        email: email || 'arjun.sharma@peak.edu',
        branch: branch || 'Computer Science & Engineering',
        currentYear: currentYear || '3rd Year',
        cgpa: cgpa ? Number(cgpa) : 8.35,
        dailyStudyHours: dailyStudyHours ? Number(dailyStudyHours) : 4,
        targetPackage: targetPackage || '15 LPA',
        completedTasksCount: completedTasksCount ? Number(completedTasksCount) : 0,
        currentStreakDays: currentStreakDays ? Number(currentStreakDays) : 1,
        currentElevationMeters: currentElevationMeters ? Number(currentElevationMeters) : 0,
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Internal server error updating profile' });
  }
});
