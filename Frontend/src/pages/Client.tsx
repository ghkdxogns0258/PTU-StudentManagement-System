import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/layout/AppNavbar';
import Header from '../components/layout/Header';
import SideMenu from '../components/navigation/SideMenu';
import { Card, CardContent, Tabs, Tab } from '@mui/material';
import ClientBasicInfo from '../components/forms/ClientBasicInfo';
import ClientAcademicInfo from '../components/forms/ClientAcademicInfo';
import ClientCounselingInfo from '../components/forms/ClientCounselingInfo';
import ClientCareerInfo from '../components/forms/ClientCareerInfo';
import AppTheme from '../theme/AppTheme';
import useStudentProfileCardData from '../hooks/useStudentProfileCardData';
import StudentProfileCard from '../components/cards/StudentProfileCard';

export default function Client(props: { disableCustomTheme?: boolean }) {
  const [selectedTab, setSelectedTab] = React.useState('basic');

  const {
    studentSettings,
    universityName,
    advisorName,
    isLoading,
  } = useStudentProfileCardData();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const name = studentSettings?.name || '';
  const studentId = studentSettings?.studentId || '';
  const avatarUrl = 'https://via.placeholder.com/100';

  return (
    <AppTheme {...props}>
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
              
              {/* ✅ 프로필 카드 */}
              <StudentProfileCard
                name={name}
                studentId={studentId}
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
                {selectedTab === 'basic' && <ClientBasicInfo />}
                {selectedTab === 'academic' && <ClientAcademicInfo />}
                {selectedTab === 'counseling' && <ClientCounselingInfo />}
                {selectedTab === 'career' && <ClientCareerInfo />}
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}