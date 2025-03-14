import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// 졸업 요건 데이터
const data = [
  { label: '전공필수', value: 40 },
  { label: '전공선택', value: 20 },
  { label: '대학교양', value: 10 },
  { label: 'P교', value: 3 },
];

// 각 졸업 요건 항목의 상세 정보
const categories = [
  {
    name: '전공필수',
    value: 50,
    icon: '📘', 
    color: 'hsl(220, 25%, 65%)',
  },
  {
    name: '전공선택',
    value: 30,
    icon: '📗', 
    color: 'hsl(220, 25%, 45%)',
  },
  {
    name: '대학교양',
    value: 15,
    icon: '📙', 
    color: 'hsl(220, 25%, 30%)',
  },
  {
    name: 'P교',
    value: 5,
    icon: '📕', 
    color: 'hsl(220, 25%, 20%)',
  },
];

const StyledText = styled('text')(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
}));

// 차트 중앙 값 표시 (총합)
function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText x={left + width / 2} y={top + height / 2 - 10} style={{ fontSize: '1.2rem', fontWeight: 600 }}>
        {primaryText}
      </StyledText>
      <StyledText x={left + width / 2} y={top + height / 2 + 15} style={{ fontSize: '0.9rem', fontWeight: 400 }}>
        {secondaryText}
      </StyledText>
    </>
  );
}

// 색상 배열
const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)', 'hsl(220, 20%, 35%)', 'hsl(220, 20%, 25%)'];

export default function GraduationRequirements() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          졸업 요건 충족도
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={380}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText="100%" secondaryText="Total Completion" />
          </PieChart>
        </Box>

        {/* 졸업 요건별 진행도 표시 */}
        {categories.map((category, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Typography sx={{ fontSize: '1.5rem' }}>{category.icon}</Typography>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {category.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={category.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: category.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
