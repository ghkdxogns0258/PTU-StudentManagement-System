import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

export default function ProfileCard() {
  const profileData = {
    photoUrl: "https://via.placeholder.com/80",
    studentId: "2021145086",
    name: "황태훈",
    grade: 3,
    projectExperience: [
      { text: "React 기반 웹 프론트엔드 개발", link: "https://github.com/P-Tip/frontend" },
      { text: "Node.js 서버 구축 및 API 개발" },
    ],
    desiredJobField: "백엔드 개발자 (Node.js, Spring)",
  };

  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 350, textAlign: 'center', p: 2, display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%' }}>
        <Stack spacing={2} alignItems="center" sx={{ flexGrow: 1, height: '100%' }}>
          
          {/* 기본 정보 섹션 */}
          <Stack spacing={1} alignItems="center" width="100%" sx={{ flexGrow: 0.5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Avatar
              src={profileData.photoUrl}
              alt={profileData.name}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6">{profileData.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              학번: {profileData.studentId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              학년: {profileData.grade}학년
            </Typography>
          </Stack>
          
          <Divider sx={{ width: '100%' }} />

          {/* 진로 정보 섹션 */}
          <Stack spacing={2} width="100%" sx={{ flexGrow: 0.5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            {/* 프로젝트 경험 섹션 */}
            <Stack spacing={1} width="100%">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                프로젝트 경험
              </Typography>
              <Stack spacing={1}>
                {profileData.projectExperience.length > 0 ? (
                  profileData.projectExperience.map((project, index) => (
                    <Typography 
                      key={index} 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ textAlign: 'center', width: '100%' }}
                    >
                      {project.link ? (
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          {project.text}
                        </Link>
                      ) : (
                        project.text
                      )}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    (공백)
                  </Typography>
                )}
              </Stack>
            </Stack>

            {/* 희망 취업 분야 섹션 */}
            <Stack spacing={1} width="100%">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                희망 취업 분야
              </Typography>
              <Stack spacing={1}>
                {profileData.desiredJobField ? (
                  <Typography variant="body2" color="text.secondary">
                    {profileData.desiredJobField}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    (공백)
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
