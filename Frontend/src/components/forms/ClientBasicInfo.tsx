import * as React from 'react';
import { TextField, Button, Stack, MenuItem, Snackbar, Alert, CircularProgress } from '@mui/material';
import { saveBasicInfo, updateBasicInfo, getBasicInfo } from '../../api/clientService';

export default function ClientBasicInfo() {
  const [formData, setFormData] = React.useState({
    grade: '',
    major: '',
    contact: '',
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [hasData, setHasData] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  // GET 요청
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBasicInfo();
        if (data) {
          // 이름, 학번을 제외한 필드만 상태에 반영
          const { grade, major, contact } = data;
          setFormData({ grade, major, contact });
          setHasData(true);
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
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
        await updateBasicInfo(formData);
        setSnackbarMessage('기본 정보 수정 완료!');
      } else {
        await saveBasicInfo(formData);
        setHasData(true);
        setSnackbarMessage('기본 정보 저장 완료!');
      }
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('저장 중 오류가 발생했습니다.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {/* 이름, 학번 필드 삭제 */}
          <TextField
            select
            label="학년"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="1">1학년</MenuItem>
            <MenuItem value="2">2학년</MenuItem>
            <MenuItem value="3">3학년</MenuItem>
            <MenuItem value="4">4학년</MenuItem>
          </TextField>

          <TextField label="전공" name="major" value={formData.major} onChange={handleChange} fullWidth />
          <TextField label="연락처" name="contact" value={formData.contact} onChange={handleChange} fullWidth />

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
