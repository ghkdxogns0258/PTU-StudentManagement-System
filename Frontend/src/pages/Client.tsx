import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/layout/AppNavbar';
import Header from '../components/layout/Header';
import SideMenu from '../components/navigation/SideMenu';
import { Card, CardContent, Avatar, Typography, Tabs, Tab } from '@mui/material';
import ClientBasicInfo from '../components/forms/ClientBasicInfo';
import ClientAcademicInfo from '../components/forms/ClientAcademicInfo';
import ClientCounselingInfo from '../components/forms/ClientCounselingInfo';
import ClientCareerInfo from '../components/forms/ClientCareerInfo';
import AppTheme from '../theme/AppTheme';

export default function Client(props: { disableCustomTheme?: boolean }) {
  const [selectedTab, setSelectedTab] = React.useState('basic'); // 기본 탭 선택

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

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
              
              <Avatar
                src="https://via.placeholder.com/100" 
                alt="학생 사진"
                sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
              />
              <Typography variant="h5">황태훈</Typography>
              <Typography variant="body2" color="text.secondary">평택대학교</Typography>
              <Typography variant="body2" color="text.secondary">2021145086</Typography>
              <Typography variant="body2" color="text.secondary">지도교수:이태규</Typography>

              
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
