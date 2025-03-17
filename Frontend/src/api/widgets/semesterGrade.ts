import http from '../http';

export interface SemesterGradeData {
  subjects: string[];
  grades: string[];
}

export const getSemesterGradeData = async (id: string): Promise<SemesterGradeData> => {
    const res = await http.get<SemesterGradeData>(`/widgets/semester-grade/${id}`);
    return res.data;
  };  