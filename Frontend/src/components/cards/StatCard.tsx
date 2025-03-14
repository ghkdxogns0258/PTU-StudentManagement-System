import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ProfileCard from '../visualization/ProfileCard';
import GraduationRequirements from '../visualization/GraduationRequirements';
import SemesterGrade from '../visualization/SemesterGrade';
import SemesterGradeChange from '../visualization/SemesterGradeChange';

export default function StatCard() {
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, p: 2 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}> 
        <Grid container spacing={2} columns={12} sx={{ flexGrow: 1, height: '100%' }}> 
          
          <Grid item xs={12} lg={2.5} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}> 
            <ProfileCard /> 
          </Grid>
          
          <Grid item xs={12} lg={7} sx={{ height: '100%' }}>
            <Stack spacing={1} direction="column" sx={{ height: '100%' }}>
              <SemesterGradeChange />
              <SemesterGrade />
            </Stack>
          </Grid>

          <Grid item xs={12} lg={2.5} sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <GraduationRequirements />
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}
