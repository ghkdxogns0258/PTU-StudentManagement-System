import axios, { AxiosRequestConfig } from 'axios';

// axios 인스턴스 생성 (기본 설정)
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// 공통 axios 요청 핸들러
async function handleRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: object
): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...(body ? { data: body } : {}),
  };

  const response = await api(config);
  return response.data as T;
}

// 기본 정보 API 
interface BasicInfo {
  grade: string;
  major: string;
  contact: string;
}

// GET 기본 정보
export async function getBasicInfo(): Promise<BasicInfo> {
  return handleRequest<BasicInfo>('/basic-info')
    .then((data) => data as BasicInfo)
    .catch(() => ({
      grade: '',
      major: '',
      contact: '',
    }));
}

// POST 기본 정보 저장
export async function saveBasicInfo(data: BasicInfo): Promise<void> {
  return handleRequest('/basic-info', 'POST', data);
}

// PUT 기본 정보 수정
export async function updateBasicInfo(data: BasicInfo): Promise<void> {
  return handleRequest('/basic-info', 'PUT', data);
}

// 진로 정보 API
interface CareerInfo {
  jobField: string;
  certificates: string;
  internships: string;
  projects: string;
}

export async function getCareerInfo(): Promise<CareerInfo> {
  return handleRequest<CareerInfo>('/career-info')
    .then((data) => data as CareerInfo)
    .catch(() => ({
      jobField: '',
      certificates: '',
      internships: '',
      projects: '',
    }));
}

export async function saveCareerInfo(data: CareerInfo): Promise<void> {
  return handleRequest('/career-info', 'POST', data);
}

export async function updateCareerInfo(data: CareerInfo): Promise<void> {
  return handleRequest('/career-info', 'PUT', data);
}

// 학업 정보 API
interface AcademicInfo {
  semester: string;
  subjects: any[];
  graduationProgress: number;
}

export async function getAcademicInfo(): Promise<AcademicInfo> {
  return handleRequest<AcademicInfo>('/academic-info')
    .then((data) => data as AcademicInfo)
    .catch(() => ({
      semester: '1학년 1학기',
      subjects: [],
      graduationProgress: 60,
    }));
}

export async function saveAcademicInfo(data: AcademicInfo): Promise<void> {
  return handleRequest('/academic-info', 'POST', data);
}

export async function updateAcademicInfo(data: AcademicInfo): Promise<void> {
  return handleRequest('/academic-info', 'PUT', data);
}
