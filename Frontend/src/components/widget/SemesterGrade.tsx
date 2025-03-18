import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { getSemesterGradeData, SemesterGradeData } from '../../api/widgets/semesterGrade';

interface Props {
  id: string;
  isEditMode: boolean;
}

export default function SemesterGrade({ id }: Props) {
  const theme = useTheme();

  const [data, setData] = React.useState<SemesterGradeData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const defaultData: SemesterGradeData = {
    subjects: ['자료구조', '운영체제', '데이터베이스', '알고리즘', '컴퓨터 네트워크'],
    grades: ['A', 'B+', 'B', 'A+', 'C+'],
  };

  React.useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getSemesterGradeData(id);
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

  const semesterData = data || defaultData;

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

  type GradeKey = keyof typeof gradeScale;

  const gradeData = semesterData.grades.map((grade) => gradeScale[grade as GradeKey] ?? 0);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>1학기 세부성적</Typography>
        <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Typography variant="h4">B+</Typography>
            <Chip size="small" color="success" label="+변화량%" />
          </Stack>
          <Typography variant="caption" color="text.secondary">1학기 과목별 성적</Typography>
        </Stack>

        <BarChart
          borderRadius={8}
          colors={[theme.palette.primary.main]}
          xAxis={[{ scaleType: 'band', categoryGapRatio: 0.5, data: semesterData.subjects }]}
          yAxis={[{ scaleType: 'linear', min: 0, max: 4.5 }]}
          series={[{
            id: 'semester1',
            label: '1학기',
            data: gradeData,
            stack: 'A',
            valueFormatter: (value) => {
              const grade = (Object.keys(gradeScale) as GradeKey[]).find(
                (key) => gradeScale[key] === value
              );
              return grade ?? value.toFixed(1);
            },
          }]}
          height={200}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{ legend: { hidden: true } }}
        />
      </CardContent>
    </Card>
  );
}