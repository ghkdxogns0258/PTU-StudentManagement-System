import http from '../http';

export interface GraduationCategory {
  name: string;
  value: number;
  icon: string;
  color: string;
}

export interface GraduationStatusData {
  categories: GraduationCategory[];
  totalCompletion: string;
}

export const getGraduationStatusData = async (id: string): Promise<GraduationStatusData> => {
    const res = await http.get<GraduationStatusData>(`/widgets/graduation-status/${id}`);
    return res.data;
  };  