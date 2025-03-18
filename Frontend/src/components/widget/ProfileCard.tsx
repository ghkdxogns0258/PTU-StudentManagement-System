import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { getProfileCardData, ProfileCardData } from '../../api/widgets/profileCard';

interface Props {
  id: string;
  isEditMode: boolean;
}

export default function ProfileCard({ id }: Props) {
  const [data, setData] = React.useState<ProfileCardData | null>(null);
  const [loading, setLoading] = React.useState(false);

  const defaultData: ProfileCardData = {
    photoUrl: "https://via.placeholder.com/80",
    studentId: "2021145086",
    name: "홍길동",
    grade: 1,
    projectExperience: [],
    desiredJobField: "미정",
  };

  React.useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getProfileCardData(id);
        setData(res);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <CircularProgress />;

  const profile = data || defaultData;

  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 350, textAlign: 'center', p: 2, display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%' }}>
        <Stack spacing={2} alignItems="center" sx={{ flexGrow: 1, height: '100%' }}>
          <Stack spacing={1} alignItems="center" width="100%" sx={{ flexGrow: 0.5 }}>
            <Avatar src={profile.photoUrl} alt={profile.name} sx={{ width: 100, height: 100 }} />
            <Typography variant="h6">{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary">학번: {profile.studentId}</Typography>
            <Typography variant="body2" color="text.secondary">학년: {profile.grade}학년</Typography>
          </Stack>

          <Divider sx={{ width: '100%' }} />

          <Stack spacing={2} width="100%" sx={{ flexGrow: 0.5 }}>
            <Stack spacing={1} width="100%">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>프로젝트 경험</Typography>
              <Stack spacing={1}>
                {profile.projectExperience.length > 0 ? (
                  profile.projectExperience.map((project, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {project.link ? (
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">{project.text}</Link>
                      ) : project.text}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">(공백)</Typography>
                )}
              </Stack>
            </Stack>

            <Stack spacing={1} width="100%">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>희망 취업 분야</Typography>
              <Typography variant="body2" color="text.secondary">{profile.desiredJobField || '(공백)'}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
