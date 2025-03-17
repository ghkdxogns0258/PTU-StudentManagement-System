import * as React from 'react';
import { List, ListItem, ListItemText, Typography, Stack, CircularProgress, TextField, Button, Snackbar, Alert } from '@mui/material';
import { fetchStudentCounselingHistory, addStudentCounseling } from '../../api/students';
import { CounselingHistory } from '../../api/types/students';

interface Props {
  studentId: string;
}

export default function StudentCounselingInfo({ studentId }: Props) {
  const [records, setRecords] = React.useState<CounselingHistory[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [newTitle, setNewTitle] = React.useState('');
  const [newMemo, setNewMemo] = React.useState('');

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  React.useEffect(() => {
    fetchRecords();
  }, [studentId]);

  const fetchRecords = async () => {
    try {
      const data = await fetchStudentCounselingHistory(studentId);
      setRecords(data);
    } catch (error) {
      console.error('상담 기록 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCounseling = async () => {
    try {
      await addStudentCounseling(studentId, { title: newTitle, memo: newMemo });
      setSnackbarMessage('상담 기록이 추가되었습니다.');
      setSnackbarSeverity('success');
      setNewTitle('');
      setNewMemo('');
      fetchRecords();
    } catch (error) {
      setSnackbarMessage('상담 기록 추가 실패');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant="h6">상담 기록</Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {records.map((record, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
              <ListItemText
                primary={`${record.date} - ${record.title}`}
                secondary={`메모: ${record.memo}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <TextField label="상담 제목" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} fullWidth />
      <TextField label="상담 메모" value={newMemo} onChange={(e) => setNewMemo(e.target.value)} fullWidth multiline minRows={3} />

      <Button variant="contained" onClick={handleAddCounseling}>
        상담 기록 추가
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
