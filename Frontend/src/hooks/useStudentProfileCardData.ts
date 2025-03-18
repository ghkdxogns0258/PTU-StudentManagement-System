import { useState, useEffect } from 'react';
import { StudentSettings } from '../api/types/userSettings';
import {
  fetchUserSettings,
  fetchUniversities,
  fetchProfessorsByUniversity,
} from '../api/userSettings';

interface UseStudentProfileCardDataReturn {
  studentSettings: StudentSettings | null;
  universityName: string;
  advisorName: string;
  isLoading: boolean;
}

export default function useStudentProfileCardData(): UseStudentProfileCardDataReturn {
  const [studentSettings, setStudentSettings] = useState<StudentSettings | null>(null);
  const [universityName, setUniversityName] = useState('');
  const [advisorName, setAdvisorName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const settings = await fetchUserSettings();

        if (settings.role === 'student') {
          setStudentSettings(settings);

          const universities = await fetchUniversities();
          const university = universities.find((u) => u.id === settings.universityId);
          setUniversityName(university ? university.name : '');

          const professors = await fetchProfessorsByUniversity(settings.universityId);
          const advisor = professors.find((p) => p.id === settings.advisorProfessorId);
          setAdvisorName(advisor ? advisor.name : '');
        }
      } catch (error) {
        console.error('프로필 카드 데이터 로딩 실패:', error);

        // 기본값 초기화
        setStudentSettings(null);
        setUniversityName('');
        setAdvisorName('');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    studentSettings,
    universityName,
    advisorName,
    isLoading,
  };
}
