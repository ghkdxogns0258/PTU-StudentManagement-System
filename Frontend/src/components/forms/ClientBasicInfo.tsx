import * as React from 'react';
import { TextField, Button, Stack, MenuItem, Snackbar, Alert, CircularProgress } from '@mui/material';
import { getBasicInfo, updateBasicInfo } from '../../api/clientData';

export default function ClientBasicInfo() {
  const [formData, setFormData] = React.useState({
    grade: '',
    major: '',
    phoneNumber: '',
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBasicInfo();
        setFormData(data);
      } catch (error) {
        console.error('기본 정보 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await updateBasicInfo(formData);
      setSnackbarMessage('기본 정보 수정 완료!');
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
          <TextField select label="학년" name="grade" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} fullWidth>
            <MenuItem value="1학년">1학년</MenuItem>
            <MenuItem value="2학년">2학년</MenuItem>
            <MenuItem value="3학년">3학년</MenuItem>
            <MenuItem value="4학년">4학년</MenuItem>
          </TextField>
          <TextField label="전공" name="major" value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} fullWidth />
          <TextField label="연락처" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} fullWidth />
          <Button variant="contained" onClick={handleSubmit}>수정</Button>
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
