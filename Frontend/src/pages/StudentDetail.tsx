import * as React from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/layout/AppNavbar';
import Header from '../components/layout/Header';
import SideMenu from '../components/navigation/SideMenu';
import { Card, CardContent, Tabs, Tab, Typography } from '@mui/material';
import StudentBasicInfo from '../components/views/StudentBasicInfo';
import StudentAcademicInfo from '../components/views/StudentAcademicInfo';
import StudentCounselingInfo from '../components/views/StudentCounselingInfo';
import StudentCareerInfo from '../components/views/StudentCareerInfo';
import AppTheme from '../theme/AppTheme';
import useStudentProfileCardData from '../hooks/useStudentProfileCardData';
import StudentProfileCard from '../components/cards/StudentProfileCard';

export default function StudentDetail() {
  const { studentId } = useParams<{ studentId: string }>();
  const [selectedTab, setSelectedTab] = React.useState('basic');

  const {
    studentSettings,
    universityName,
    advisorName,
    isLoading,
  } = useStudentProfileCardData();

  if (!studentId) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">잘못된 접근입니다. 학생 정보를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  const name = studentSettings?.name || '';
  const studentIdText = studentSettings?.studentId || '';
  const avatarUrl = 'https://via.placeholder.com/100';

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: 'auto',
            padding: 3,
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <Stack spacing={2} sx={{ alignItems: 'center', pb: 5, width: '100%', maxWidth: 900 }}>
            <Header />

            <Card variant="outlined" sx={{ width: '100%', maxWidth: 600, p: 3, textAlign: 'center' }}>
              
              {/* ✅ 프로필 영역 */}
              <StudentProfileCard
                name={name}
                studentId={studentIdText}
                universityName={universityName}
                advisorName={advisorName}
                avatarUrl={avatarUrl}
              />

              {/* ✅ 탭 */}
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                sx={{ mt: 2, mb: 2 }}
              >
                <Tab label="기본 정보" value="basic" />
                <Tab label="학업 정보" value="academic" />
                <Tab label="상담 정보" value="counseling" />
                <Tab label="진로 정보" value="career" />
              </Tabs>

              {/* ✅ 상세 정보 */}
              <CardContent>
                {selectedTab === 'basic' && <StudentBasicInfo studentId={studentId} />}
                {selectedTab === 'academic' && <StudentAcademicInfo studentId={studentId} />}
                {selectedTab === 'counseling' && <StudentCounselingInfo studentId={studentId} />}
                {selectedTab === 'career' && <StudentCareerInfo studentId={studentId} />}
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}