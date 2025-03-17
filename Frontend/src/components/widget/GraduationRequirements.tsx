import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { PieChart } from '@mui/x-charts/PieChart';
import { getGraduationStatusData, GraduationStatusData } from '../../api/widgets/graduationStatus';

export default function GraduationRequirements({ id }: { id: string }) {
  const [data, setData] = React.useState<GraduationStatusData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const defaultData: GraduationStatusData = {
    categories: [
      { name: '전공필수', value: 50, icon: '📘', color: 'hsl(220, 25%, 65%)' },
      { name: '전공선택', value: 30, icon: '📗', color: 'hsl(220, 25%, 45%)' },
      { name: '대학교양', value: 15, icon: '📙', color: 'hsl(220, 25%, 30%)' },
      { name: 'P교', value: 5, icon: '📕', color: 'hsl(220, 25%, 20%)' },
    ],
    totalCompletion: '100%',
  };

  React.useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getGraduationStatusData(id);
        setData(res);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <CircularProgress />;

  const graduationData = data || defaultData;

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">졸업 요건 충족도</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={['#8884d8', '#82ca9d', '#ffc658', '#ff8042']}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[{ data: graduationData.categories, innerRadius: 75, outerRadius: 100 }]}
            height={380}
            width={260}
            slotProps={{ legend: { hidden: true } }}
          />
        </Box>

        {graduationData.categories.map((category, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Typography sx={{ fontSize: '1.5rem' }}>{category.icon}</Typography>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>{category.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{category.value}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={category.value}
                sx={{ [`& .${linearProgressClasses.bar}`]: { backgroundColor: category.color } }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}