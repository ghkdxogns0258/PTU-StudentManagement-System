import * as React from 'react';
import { TextField, Button, Stack, MenuItem, Snackbar, Alert, CircularProgress } from '@mui/material';
import { getGrades, updateGrades } from '../../api/clientData';
import { Grade } from '../../api/types/clientData';

export default function ClientAcademicInfo() {
  const [semester, setSemester] = React.useState('1학년 1학기');
  const [grades, setGrades] = React.useState<Grade[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  // 학업 정보 불러오기
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGrades(semester);
        setGrades(data);
      } catch (error) {
        console.error('성적 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [semester]);

  // 성적 수정
  const handleSubmit = async () => {
    try {
      await updateGrades(semester, grades);
      setSnackbarMessage('성적 수정 완료!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('저장 중 오류가 발생했습니다.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
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

          {grades.map((grade, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <TextField
                label="영역"
                value={grade.area}
                disabled
                sx={{ width: '30%' }}
              />
              <TextField
                label="과목명"
                value={grade.subjectName}
                disabled
                sx={{ width: '40%' }}
              />
              <TextField
                label="성적"
                value={grade.grade}
                onChange={(e) => {
                  const updatedGrades = [...grades];
                  updatedGrades[index].grade = e.target.value;
                  setGrades(updatedGrades);
                }}
                sx={{ width: '20%' }}
              />
            </Stack>
          ))}

          <Button variant="contained" onClick={handleSubmit}>
            수정
          </Button>
        </>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
