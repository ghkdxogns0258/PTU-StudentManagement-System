import * as React from 'react';
import { Stack, TextField, CircularProgress } from '@mui/material';
import { fetchStudentProfile } from '../../api/students';
import { StudentProfile } from '../../api/types/students';

interface Props {
  studentId: string;
}

export default function StudentBasicInfo({ studentId }: Props) {
  const [profile, setProfile] = React.useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchStudentProfile(studentId);
        setProfile(data);
      } catch (error) {
        console.error('기본 정보 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [studentId]);

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      {isLoading || !profile ? (
        <CircularProgress />
      ) : (
        <>
          <TextField label="학년" value={profile.grade} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="전공" value={profile.major} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="연락처" value={profile.phoneNumber} InputProps={{ readOnly: true }} fullWidth />
        </>
      )}
    </Stack>
  );
}
