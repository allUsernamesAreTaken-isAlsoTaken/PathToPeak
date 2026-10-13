import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';

export const skillsRouter = Router();

// GET /api/skills
skillsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const rawSkills = await prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });

    const skills = rawSkills.map((s) => ({
      ...s,
      requiredFor: typeof s.requiredFor === 'string' ? JSON.parse(s.requiredFor) : s.requiredFor,
    }));

    return res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({ error: 'Internal server error fetching skills' });
  }
});

// PATCH /api/skills/:id
skillsRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { level, practiceCount, recommendedHours } = req.body;

    const updated = await prisma.skill.update({
      where: { id },
      data: {
        ...(level !== undefined && { level }),
        ...(practiceCount !== undefined && { practiceCount: Number(practiceCount) }),
        ...(recommendedHours !== undefined && { recommendedHours: Number(recommendedHours) }),
      },
    });

    return res.json({
      ...updated,
      requiredFor: typeof updated.requiredFor === 'string' ? JSON.parse(updated.requiredFor) : updated.requiredFor,
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    return res.status(500).json({ error: 'Internal server error updating skill' });
  }
});
