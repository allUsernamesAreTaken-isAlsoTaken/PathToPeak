import type { StudentProfile, SkillItem, Company, PlannerTask, SkillLevel } from '../types';

const rawApiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
const formattedApiUrl = rawApiUrl
  ? (rawApiUrl.startsWith('http://') || rawApiUrl.startsWith('https://')
      ? rawApiUrl
      : `https://${rawApiUrl}`
    ).replace(/\/$/, '')
  : '';

const API_BASE_URL = formattedApiUrl ? `${formattedApiUrl}/api` : '/api';

export const api = {
  // Profile
  async getProfile(): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE_URL}/profile`);
    if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`);
    return res.json();
  },

  async updateProfile(updates: Partial<StudentProfile>): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Failed to update profile: ${res.statusText}`);
    return res.json();
  },

  // Skills
  async getSkills(): Promise<SkillItem[]> {
    const res = await fetch(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error(`Failed to fetch skills: ${res.statusText}`);
    return res.json();
  },

  async updateSkillLevel(skillId: string, level: SkillLevel): Promise<SkillItem> {
    const res = await fetch(`${API_BASE_URL}/skills/${encodeURIComponent(skillId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level }),
    });
    if (!res.ok) throw new Error(`Failed to update skill: ${res.statusText}`);
    return res.json();
  },

  // Companies
  async getCompanies(): Promise<Company[]> {
    const res = await fetch(`${API_BASE_URL}/companies`);
    if (!res.ok) throw new Error(`Failed to fetch companies: ${res.statusText}`);
    return res.json();
  },

  // Tasks
  async getTasks(): Promise<PlannerTask[]> {
    const res = await fetch(`${API_BASE_URL}/tasks`);
    if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.statusText}`);
    return res.json();
  },

  async addTask(task: Omit<PlannerTask, 'id' | 'completed'> & { id?: string; completed?: boolean }): Promise<PlannerTask> {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error(`Failed to create task: ${res.statusText}`);
    return res.json();
  },

  async toggleTask(taskId: string): Promise<PlannerTask> {
    const res = await fetch(`${API_BASE_URL}/tasks/${encodeURIComponent(taskId)}/toggle`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error(`Failed to toggle task: ${res.statusText}`);
    return res.json();
  },

  async deleteTask(taskId: string): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE_URL}/tasks/${encodeURIComponent(taskId)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete task: ${res.statusText}`);
    return res.json();
  },
};
