import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';

export const tasksRouter = Router();

// GET /api/tasks
tasksRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.plannerTask.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Internal server error fetching tasks' });
  }
});

// POST /api/tasks
tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { id, domain, title, durationMinutes, completed, priority, dueTime, timeBlock } = req.body;

    if (!domain || !title) {
      return res.status(400).json({ error: 'domain and title are required' });
    }

    const taskId = id || `task-${Date.now()}`;
    const newTask = await prisma.plannerTask.create({
      data: {
        id: taskId,
        domain,
        title,
        durationMinutes: Number(durationMinutes) || 30,
        completed: Boolean(completed),
        priority: priority || 'Medium',
        dueTime: dueTime || '18:00',
        timeBlock: timeBlock || 'Evening',
      },
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Internal server error creating task' });
  }
});

// PATCH /api/tasks/:id/toggle
tasksRouter.patch('/:id/toggle', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.plannerTask.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updated = await prisma.plannerTask.update({
      where: { id },
      data: { completed: !existing.completed },
    });

    return res.json(updated);
  } catch (error) {
    console.error('Error toggling task:', error);
    return res.status(500).json({ error: 'Internal server error toggling task' });
  }
});

// PATCH /api/tasks/:id
tasksRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { domain, title, durationMinutes, completed, priority, dueTime, timeBlock } = req.body;

    const updated = await prisma.plannerTask.update({
      where: { id },
      data: {
        ...(domain !== undefined && { domain }),
        ...(title !== undefined && { title }),
        ...(durationMinutes !== undefined && { durationMinutes: Number(durationMinutes) }),
        ...(completed !== undefined && { completed: Boolean(completed) }),
        ...(priority !== undefined && { priority }),
        ...(dueTime !== undefined && { dueTime }),
        ...(timeBlock !== undefined && { timeBlock }),
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Internal server error updating task' });
  }
});

// DELETE /api/tasks/:id
tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.plannerTask.delete({
      where: { id },
    });

    return res.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Internal server error deleting task' });
  }
});
