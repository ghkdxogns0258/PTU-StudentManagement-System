import * as React from 'react';
import { List, ListItem, ListItemText, Typography, Stack } from '@mui/material';

export default function ClientCounselingInfo() {
  const counselingRecords = [
    { date: '2024-01-15', topic: '진로 상담', professor: '김교수', notes: '백엔드 개발자로 가려면 어떤 기술을 공부해야 할까?' },
    { date: '2024-03-10', topic: '학업 상담', professor: '박교수', notes: '이번 학기 성적이 낮아졌는데 어떻게 개선할 수 있을까?' },
  ];

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant="h6">상담 기록</Typography>
      <List>
        {counselingRecords.map((record, index) => (
          <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText
              primary={`${record.date} - ${record.topic}`}
              secondary={`교수님: ${record.professor} | 메모: ${record.notes}`}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
