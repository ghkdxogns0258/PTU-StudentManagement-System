import * as React from 'react';
import { TextField, Button, Stack, Snackbar, Alert, CircularProgress } from '@mui/material';
import { getCareerInfo, updateCareerInfo } from '../../api/clientData';
import { CareerInfo } from '../../api/types/clientData';

export default function ClientCareerInfo() {
  const [careerInfo, setCareerInfo] = React.useState<CareerInfo>({
    desiredJob: '',
    certifications: [],
    internships: [],
    projects: [],
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  // GET 요청
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCareerInfo();
        setCareerInfo(data);
      } catch (error) {
        console.error('진로 정보 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 저장 API 호출
  const handleSubmit = async () => {
    try {
      await updateCareerInfo(careerInfo);
      setSnackbarMessage('진로 정보 수정 완료!');
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
          <TextField label="희망 직무" name="desiredJob" value={careerInfo.desiredJob} onChange={handleChange} fullWidth />
          <TextField label="자격증" name="certifications" value={careerInfo.certifications.join(', ')} onChange={handleChange} fullWidth />
          <TextField label="인턴십 이력" name="internships" value={careerInfo.internships.join(', ')} onChange={handleChange} fullWidth />
          <TextField label="프로젝트 경험" name="projects" value={careerInfo.projects.join(', ')} onChange={handleChange} fullWidth />

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
