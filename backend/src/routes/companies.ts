import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';

export const companiesRouter = Router();

// GET /api/companies
companiesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const rawCompanies = await prisma.company.findMany({
      orderBy: { ascentMatchPercent: 'desc' },
    });

    const companies = rawCompanies.map((c) => ({
      ...c,
      interviewStages: typeof c.interviewStages === 'string' ? JSON.parse(c.interviewStages) : c.interviewStages,
      keySkills: typeof c.keySkills === 'string' ? JSON.parse(c.keySkills) : c.keySkills,
      resources: typeof c.resources === 'string' ? JSON.parse(c.resources) : c.resources,
    }));

    return res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return res.status(500).json({ error: 'Internal server error fetching companies' });
  }
});
