import * as React from 'react';
import { TextField, Button, Stack, MenuItem, Snackbar, Alert, CircularProgress } from '@mui/material';
import { getCareerInfo, saveCareerInfo, updateCareerInfo } from '../../api/clientService';

export default function ClientCareerInfo() {
  const [careerInfo, setCareerInfo] = React.useState({
    jobField: '',
    certificates: '',
    internships: '',
    projects: '',
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [hasData, setHasData] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  // ✅ 초기에 한 번만 GET 요청 실행
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCareerInfo();
        if (data) {
          setCareerInfo(data);
          setHasData(true);
        }
      } catch (error) {
        console.error('진로 정보 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // ✅ 저장 및 수정 API 호출
  const handleSubmit = async () => {
    try {
      if (hasData) {
        await updateCareerInfo(careerInfo);
        setSnackbarMessage('진로 정보 수정 완료!');
      } else {
        await saveCareerInfo(careerInfo);
        setHasData(true);
        setSnackbarMessage('진로 정보 저장 완료!');
      }
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('저장 중 오류가 발생했습니다.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCareerInfo({ ...careerInfo, [e.target.name]: e.target.value });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            select
            label="희망 직무"
            name="jobField"
            value={careerInfo.jobField}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="백엔드 개발">백엔드 개발</MenuItem>
            <MenuItem value="프론트엔드 개발">프론트엔드 개발</MenuItem>
            <MenuItem value="데이터 사이언스">데이터 사이언스</MenuItem>
            <MenuItem value="UI/UX 디자인">UI/UX 디자인</MenuItem>
          </TextField>

          <TextField label="자격증" name="certificates" value={careerInfo.certificates} onChange={handleChange} fullWidth />
          <TextField label="인턴십 이력" name="internships" value={careerInfo.internships} onChange={handleChange} fullWidth />
          <TextField label="프로젝트 경험" name="projects" value={careerInfo.projects} onChange={handleChange} fullWidth />

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
