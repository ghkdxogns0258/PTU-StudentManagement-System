import * as React from 'react';
import { TextField, Stack, MenuItem, CircularProgress } from '@mui/material';
import { fetchStudentGradesDetails } from '../../api/students';
import { StudentGradeDetail } from '../../api/types/students';

interface Props {
  studentId: string;
}

export default function StudentAcademicInfo({ studentId }: Props) {
  const [semester, setSemester] = React.useState('1학년 1학기');
  const [grades, setGrades] = React.useState<StudentGradeDetail[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchStudentGradesDetails(studentId, semester);
        setGrades(data);
      } catch (error) {
        console.error('성적 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [studentId, semester]);

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      <TextField
        select
        label="학기 선택"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        fullWidth
      >
        {['1학년 1학기', '1학년 2학기', '2학년 1학기', '2학년 2학기', '3학년 1학기', '3학년 2학기', '4학년 1학기', '4학년 2학기'].map((sem) => (
          <MenuItem key={sem} value={sem}>{sem}</MenuItem>
        ))}
      </TextField>

      {isLoading ? (
        <CircularProgress />
      ) : (
        grades.map((grade, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            <TextField label="영역" value={grade.area} disabled sx={{ width: '30%' }} />
            <TextField label="과목명" value={grade.subjectName} disabled sx={{ width: '40%' }} />
            <TextField label="성적" value={grade.grade} disabled sx={{ width: '20%' }} />
          </Stack>
        ))
      )}
    </Stack>
  );
}
