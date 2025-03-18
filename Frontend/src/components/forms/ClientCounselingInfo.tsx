import * as React from 'react';
import { List, ListItem, ListItemText, Typography, Stack, CircularProgress } from '@mui/material';
import { getCounselingRecords } from '../../api/clientData';
import { CounselingRecord } from '../../api/types/clientData';

export default function ClientCounselingInfo() {
  const [counselingRecords, setCounselingRecords] = React.useState<CounselingRecord[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // 상담 기록 불러오기
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCounselingRecords();
        setCounselingRecords(data);
      } catch (error) {
        console.error('상담 기록 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant="h6">상담 기록</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {counselingRecords.map((record, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
              <ListItemText
                primary={`${record.date} - ${record.title}`}
                secondary={`메모: ${record.memo}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}
