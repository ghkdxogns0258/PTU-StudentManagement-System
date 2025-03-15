import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchUniversities,
  fetchProfessorsByUniversity,
  saveUserSettings,
} from '../api/userSettings';
import { University, Professor, ProfessorSettings, StudentSettings } from '../api/types/userSettings';

export function useUserSettings() {
  const navigate = useNavigate();

  // ✅ 교수/학생 구분 (role)
  const [role, setRole] = React.useState<'professor' | 'student'>('student');

  // ✅ API 문서 기준으로 폼 데이터 초기화
  const [formData, setFormData] = React.useState<StudentSettings | ProfessorSettings>({
    role,
    universityId: 0,
    name: '',
    advisorProfessorId: '',
    studentId: '',
    professorId: '',
    position: '',
  });

  // ✅ 대학 목록 가져오기 (🔹 오류 해결)
  const { data: universitiesData = [] } = useQuery({
    queryKey: ['universities'], 
    queryFn: fetchUniversities, 
  });

  // ✅ 특정 대학 교수 목록 가져오기 (학생 선택 시)
  const {
    data: professorsData = [],
    refetch: refetchProfessors,
  } = useQuery({
    queryKey: ['professors', formData.universityId], 
    queryFn: () => fetchProfessorsByUniversity(formData.universityId),
    enabled: !!formData.universityId, 
  });

  // ✅ 유저 정보 저장
  const mutation = useMutation({
    mutationFn: saveUserSettings,
    onSuccess: () => {
      navigate(role === 'professor' ? '/dashboard' : '/client');
    },
  });

  // ✅ 역할 선택 핸들러
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value as 'professor' | 'student';
    setRole(newRole);

    setFormData((prev) => ({
      role: newRole,
      universityId: prev.universityId,
      name: '',
      professorId: '',
      position: '',
      advisorProfessorId: '',
      studentId: '',
    }));
  };

  // ✅ 입력값 변경 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // ✅ 대학 선택 핸들러
  const handleUniversityChange = (event: any, newValue: University | null) => {
    setFormData((prev) => ({
      ...prev,
      universityId: newValue ? newValue.id : 0,
    }));
    if (newValue) refetchProfessors();
  };

  // ✅ 교수 선택 핸들러 (학생일 때)
  const handleProfessorChange = (event: any, newValue: Professor | null) => {
    setFormData((prev) => ({
      ...prev,
      advisorProfessorId: newValue ? newValue.id : '',
    }));
  };

  // ✅ 폼 제출
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return {
    role,
    formData,
    universitiesData,
    professorsData,
    mutation,
    handleRoleChange,
    handleInputChange,
    handleUniversityChange,
    handleProfessorChange,
    handleSubmit,
  };
}
