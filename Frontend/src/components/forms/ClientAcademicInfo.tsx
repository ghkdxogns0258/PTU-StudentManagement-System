import * as React from 'react';
import { TextField, Button, Stack, MenuItem, LinearProgress, Typography, IconButton, Snackbar, Alert, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAcademicInfo, saveAcademicInfo, updateAcademicInfo } from '../../api/clientService';

// ✅ 학업 정보 타입 정의
interface Subject {
  field: string;
  name: string;
  grade: string;
}

interface AcademicInfo {
  semester: string;
  subjects: Subject[];
  graduationProgress: number;
}

export default function ClientAcademicInfo() {
  const [semester, setSemester] = React.useState('1학년 1학기');
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [graduationProgress, setGraduationProgress] = React.useState(60);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasData, setHasData] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  // 학업 정보 불러오기
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data: AcademicInfo = await getAcademicInfo();
        setSemester(data?.semester ?? '1학년 1학기');
        setSubjects(data?.subjects ?? []);
        setGraduationProgress(data?.graduationProgress ?? 60);
        setHasData(!!data);
      } catch (error) {
        console.error('학업 정보 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 저장 및 수정 API 호출
  const handleSubmit = async () => {
    try {
      if (hasData) {
        await updateAcademicInfo({ semester, subjects, graduationProgress });
        setSnackbarMessage('학업 정보 수정 완료!');
      } else {
        await saveAcademicInfo({ semester, subjects, graduationProgress });
        setHasData(true);
        setSnackbarMessage('학업 정보 저장 완료!');
      }
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
      {isLoading ? <CircularProgress /> : (
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

          <Typography variant="h6">과목별 성적 입력</Typography>
          {subjects.map((subject, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <TextField
                select
                label="영역"
                value={subject.field}
                onChange={(e) => {
                  const updatedSubjects = [...subjects];
                  updatedSubjects[index].field = e.target.value;
                  setSubjects(updatedSubjects);
                }}
                sx={{ width: '30%' }}
              >
                {['전공필수', '전공선택', '대학교양', 'p교'].map((field) => (
                  <MenuItem key={field} value={field}>{field}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="과목명"
                value={subject.name}
                onChange={(e) => {
                  const updatedSubjects = [...subjects];
                  updatedSubjects[index].name = e.target.value;
                  setSubjects(updatedSubjects);
                }}
                sx={{ width: '40%' }}
              />

              <TextField
                label="성적"
                value={subject.grade}
                onChange={(e) => {
                  const updatedSubjects = [...subjects];
                  updatedSubjects[index].grade = e.target.value;
                  setSubjects(updatedSubjects);
                }}
                sx={{ width: '20%' }}
              />

              <IconButton onClick={() => setSubjects(subjects.filter((_, i) => i !== index))} disabled={subjects.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          <Button variant="outlined" onClick={() => setSubjects([...subjects, { field: '', name: '', grade: '' }])}>
            과목 추가
          </Button>

          <Typography variant="h6">졸업 요건 충족 상태</Typography>
          <LinearProgress variant="determinate" value={graduationProgress} />
          <Typography>{graduationProgress}% 완료</Typography>

          <Button variant="contained" onClick={handleSubmit}>
            {hasData ? '수정' : '저장'}
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
