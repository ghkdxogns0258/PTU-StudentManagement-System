// /components/cards/StatCard.tsx

import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import WidgetRenderer from '../layout/WidgetRenderer';

interface StatCardProps {
  sectionId: string;   // widgetId
  isEditMode: boolean;
}

export default function StatCard({ sectionId, isEditMode }: StatCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, p: 2 }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* sectionId에 해당하는 위젯을 렌더링 */}
        <WidgetRenderer sectionId={sectionId} isEditMode={isEditMode} />
      </CardContent>
    </Card>
  );
}
