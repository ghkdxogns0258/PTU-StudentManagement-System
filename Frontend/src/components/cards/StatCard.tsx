import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import WidgetRenderer from '../layout/WidgetRenderer';

interface StatCardProps {
  sectionId: string;   
  isEditMode: boolean;
  studentId: string;
}

export default function StatCard({ sectionId, isEditMode, studentId }: StatCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, p: 2 }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <WidgetRenderer
          sectionId={sectionId}
          isEditMode={isEditMode}
          studentId={studentId} 
        />
      </CardContent>
    </Card>
  );
}