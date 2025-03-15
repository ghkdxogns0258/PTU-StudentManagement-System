import http from './http';
import { LoginResponse, UserInfo } from './types/auth';

export const kakaoLogin = async (code: string): Promise<LoginResponse> => {
  const res = await http.post<LoginResponse>('/auth/kakao', { code });
  return res.data;
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const res = await http.get<UserInfo>('/users/me');
  return res.data;
};

export const googleLogin = async (code: string): Promise<LoginResponse> => {
  const res = await http.post<LoginResponse>('/auth/google', { code });
  return res.data;
};