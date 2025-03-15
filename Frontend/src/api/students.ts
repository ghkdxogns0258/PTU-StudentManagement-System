import http from './http';
import {
  ManagedStudent,
  StudentProfile,
  StudentGradeDetail,
  StudentCareerDetails,
  CounselingHistory,
} from './types/students';

export const fetchManagedStudents = async (
  page = 1,
  size = 20,
  search = ''
): Promise<{ students: ManagedStudent[]; totalCount: number }> => {
  const res = await http.get('/students/managed', {
    params: { page, size, search },
  });
  return res.data;
};

export const fetchStudentProfile = async (studentId: string): Promise<StudentProfile> => {
  const res = await http.get(`/students/${studentId}/profile`);
  return res.data;
};

export const fetchStudentGradesDetails = async (
  studentId: string,
  semester: string
): Promise<StudentGradeDetail[]> => {
  const res = await http.get(`/students/${studentId}/grades/details`, {
    params: { semester },
  });
  return res.data;
};

export const fetchStudentCareerDetails = async (
  studentId: string
): Promise<StudentCareerDetails> => {
  const res = await http.get(`/students/${studentId}/career/details`);
  return res.data;
};

export const fetchStudentCounselingHistory = async (
  studentId: string
): Promise<CounselingHistory[]> => {
  const res = await http.get(`/students/${studentId}/counseling/history`);
  return res.data;
};

export const addStudentCounseling = async (
  studentId: string,
  counselingData: { title: string; memo: string }
): Promise<{ message: string }> => {
  const res = await http.post(`/students/${studentId}/counseling`, counselingData);
  return res.data;
};
