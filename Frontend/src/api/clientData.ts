import http from './http';
import {
  BasicInfo,
  Grade,
  CareerInfo,
  CounselingRecord,
  CounselingRequest,
} from './types/clientData';

export const getBasicInfo = async (): Promise<BasicInfo> => {
  const res = await http.get<BasicInfo>('/client-data/basic');
  return res.data;
};

export const updateBasicInfo = async (data: BasicInfo): Promise<void> => {
  await http.put('/client-data/basic', data);
};

export const getGrades = async (semester: string): Promise<Grade[]> => {
  const res = await http.get<Grade[]>('/client-data/grades', {
    params: { semester },
  });
  return res.data;
};

export const updateGrades = async (semester: string, grades: Grade[]): Promise<void> => {
  await http.put('/client-data/grades', grades, {
    params: { semester },
  });
};

export const getCareerInfo = async (): Promise<CareerInfo> => {
  const res = await http.get<CareerInfo>('/client-data/career');
  return res.data;
};

export const updateCareerInfo = async (careerData: CareerInfo): Promise<void> => {
  await http.put('/client-data/career', careerData);
};

export const getCounselingRecords = async (): Promise<CounselingRecord[]> => {
  const res = await http.get<CounselingRecord[]>('/client-data/counseling');
  return res.data;
};

export const requestCounseling = async (request: CounselingRequest): Promise<void> => {
  await http.post('/counseling-request', request);
};
