import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GraduationRequirements from '../visualization/GraduationRequirements';
import CustomizedDataGrid from '../tables/CustomizedDataGrid';
import StatCard from '../cards/StatCard';

// Overview 섹션 함수
export function Overview() {
  return (
    <>
      <Grid container spacing={2} columns={12} sx={{  mb: 2 }}>
        <Grid size={{ xs: 12 }}>
          <StatCard />
        </Grid>
      </Grid>
    </>
  );
}

// Details 섹션 함수
export function Details() {
  return (
    <>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        지도학생
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
        <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <GraduationRequirements />
            </Stack>
            </Grid>
      </Grid>
    </>
  );
}