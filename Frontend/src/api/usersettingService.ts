import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:5000/api';

/* 공통 axios 요청 핸들러 */
async function handleRequest<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: object): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { data: body } : {}), 
  };

  const response = await axios(config);
  return response.data;
}

/* 대학 목록 조회 (GET) */
export const getUniversities = async (): Promise<string[]> => {
  return handleRequest<string[]>('/universities');
};

/* 교수 목록 조회 (GET) */
export const getProfessors = async (): Promise<string[]> => {
  return handleRequest<string[]>('/professors');
};

/* 사용자 정보 저장 (POST) */
interface UserData {
  userType: 'professor' | 'student';
  department: string;
  idNumber: string;
  position?: string; // 교수만 필요
  name: string;
  advisor?: string; // 학생만 필요
}

export const createUser = async (userData: UserData): Promise<void> => {
  return handleRequest<void>('/users', 'POST', userData);
};
