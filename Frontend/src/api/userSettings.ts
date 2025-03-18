import http from './http';
import { University, Professor, ProfessorSettings, StudentSettings } from './types/userSettings';

export const fetchUniversities = async (): Promise<University[]> => {
  const res = await http.get<University[]>('/universities');
  return res.data;
};

export const fetchProfessorsByUniversity = async (universityId: number): Promise<Professor[]> => {
  const res = await http.get<Professor[]>(`/universities/${universityId}/professors`);
  return res.data;
};

export const saveUserSettings = async (settings: ProfessorSettings | StudentSettings): Promise<{ message: string }> => {
  const res = await http.put<{ message: string }>('/users/settings', settings);
  return res.data;
};

export const fetchUserSettings = async (): Promise<ProfessorSettings | StudentSettings> => {
  const res = await http.get<ProfessorSettings | StudentSettings>('/users/settings');
  return res.data;
};