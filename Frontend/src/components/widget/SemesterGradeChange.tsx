import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

// 학기별 레이블 (1학년 1학기 ~ 4학년 2학기)
const semesters = [
  '1학년 1학기', '1학년 2학기',
  '2학년 1학기', '2학년 2학기',
  '3학년 1학기', '3학년 2학기',
  '4학년 1학기', '4학년 2학기'
];

const gpaData = [3.2, 3.5, 3.8, 3.7, 3.9, 4.0];

export default function SemesterGradeChange() {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          학기별 성적 변화
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
              {gpaData[gpaData.length - 1].toFixed(2)}
            </Typography>
            <Chip size="small" color="success" label="+ 최근 변화량" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            학기별 성적 변화 및 평균 학점
          </Typography>
        </Stack>
        <LineChart
          colors={[theme.palette.primary.main]}
          xAxis={[{
            scaleType: 'point',
            data: semesters
          }]}
          yAxis={[{
            scaleType: 'linear',
            min: 0,
            max: 4.5, 
          }]}
          series={[{
            id: 'gpa',
            label: '학점',
            showMark: true,
            curve: 'monotoneX',
            area: true,
            stack: 'total',
            stackOrder: 'ascending',
            data: gpaData,
          }]}
          height={200}
          margin={{ left: 50, right: 20, top: 20, bottom: 50 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-gpa': {
              fill: "url('#gpa')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.main} id="gpa" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
