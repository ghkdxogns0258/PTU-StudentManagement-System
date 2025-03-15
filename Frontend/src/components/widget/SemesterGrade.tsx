import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';


const subjects = ['자료구조', '운영체제', '데이터베이스', '알고리즘', '컴퓨터 네트워크'];


const grades = ['A', 'B+', 'B', 'A+', 'C+'] as const;


const gradeScale = {
  'A+': 4.5,
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
} as const;

const gradeData = grades.map(grade => gradeScale[grade]);

export default function SemesterGrade() {
  const theme = useTheme();
  const colorPalette = [(theme.vars || theme).palette.primary.main];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          1학기 세부성적
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              B+
            </Typography>
            <Chip size="small" color="success" label="+변화량%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            1학기 과목별 성적
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: subjects,
            },
          ]}
          yAxis={[
            {
              scaleType: 'linear',
              min: 0,
              max: 4.5, 
            },
          ]}
          series={[
            {
              id: 'semester1',
              label: '1학기',
              data: gradeData, 
              stack: 'A',
              valueFormatter: (value) => {
                if (value === null) return 'N/A'; 
                const grade = (Object.keys(gradeScale) as (keyof typeof gradeScale)[])
                  .find(key => gradeScale[key] === value);
                return grade ?? value.toFixed(1); 
              },
            },
          ]}
          height={200}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true, 
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
