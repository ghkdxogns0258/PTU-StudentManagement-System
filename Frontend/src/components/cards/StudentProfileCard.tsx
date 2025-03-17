import * as React from 'react';
import { Avatar, Typography } from '@mui/material';

interface StudentProfileCardProps {
  name: string;
  studentId: string;
  universityName: string;
  advisorName: string;
  avatarUrl?: string;
}

export default function StudentProfileCard({
  name,
  studentId,
  universityName,
  advisorName,
  avatarUrl = 'https://via.placeholder.com/100',
}: StudentProfileCardProps) {
  return (
    <>
      <Avatar
        src={avatarUrl}
        alt="학생 사진"
        sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
      />
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body2" color="text.secondary">{universityName}</Typography>
      <Typography variant="body2" color="text.secondary">{studentId}</Typography>
      <Typography variant="body2" color="text.secondary">지도교수: {advisorName}</Typography>
    </>
  );
}
