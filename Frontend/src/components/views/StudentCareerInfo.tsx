import * as React from 'react';
import { Stack, TextField, CircularProgress } from '@mui/material';
import { fetchStudentCareerDetails } from '../../api/students';
import { StudentCareerDetails } from '../../api/types/students';

interface Props {
  studentId: string;
}

export default function StudentCareerInfo({ studentId }: Props) {
  const [career, setCareer] = React.useState<StudentCareerDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchStudentCareerDetails(studentId);
        setCareer(data);
      } catch (error) {
        console.error('진로 정보 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [studentId]);

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      {isLoading || !career ? (
        <CircularProgress />
      ) : (
        <>
          <TextField label="희망 직무" value={career.desiredJob} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="자격증" value={career.certifications.join(', ')} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="인턴십 이력" value={career.internships.join(', ')} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="프로젝트 경험" value={career.projects.join(', ')} InputProps={{ readOnly: true }} fullWidth />
        </>
      )}
    </Stack>
  );
}
