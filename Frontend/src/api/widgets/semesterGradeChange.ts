import http from '../http';

export interface SemesterGradeChangeData {
  semesters: string[];
  gpaData: number[];
}

export const getSemesterGradeChangeData = async (id: string): Promise<SemesterGradeChangeData> => {
    const res = await http.get<SemesterGradeChangeData>(`/widgets/semester-grade-change/${id}`);
    return res.data;
  }; 