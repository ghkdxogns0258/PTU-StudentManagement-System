import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppNavbar from '../components/layout/AppNavbar';
import Header from '../components/layout/Header';
import SideMenu from '../components/navigation/SideMenu';
import AppTheme from '../theme/AppTheme';
import { Overview } from '../components/layout/MainGrid';
import { useDashboardWidgets } from '../hooks/useDashboardWidgets';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  const {
    widgets,
    isEditMode,
    handleUpdateWidgets,
    toggleEditMode,
  } = useDashboardWidgets();

  const [currentStudentId, setCurrentStudentId] = React.useState<string>('');
  const [studentList, setStudentList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        // TODO: 학생 리스트 불러오는 API로 교체
        const dummyStudents = ['2021145086', '2021145099', '2021145077'];
        setStudentList(dummyStudents);
        setCurrentStudentId(dummyStudents[0]);
      } catch (err) {
        console.error('학생 리스트 불러오기 실패:', err);
      }
    };

    fetchStudents();
  }, []);

  const handleNextStudent = () => {
    const currentIndex = studentList.indexOf(currentStudentId);
    const nextIndex = (currentIndex + 1) % studentList.length;
    setCurrentStudentId(studentList[nextIndex]);
  };

  const handlePrevStudent = () => {
    const currentIndex = studentList.indexOf(currentStudentId);
    const prevIndex = (currentIndex - 1 + studentList.length) % studentList.length;
    setCurrentStudentId(studentList[prevIndex]);
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
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'stretch',
              flexGrow: 1,
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handlePrevStudent}
                disabled={studentList.length === 0}
              >
                이전 학생
              </Button>
              <Button
                variant="outlined"
                onClick={handleNextStudent}
                disabled={studentList.length === 0}
              >
                다음 학생
              </Button>
            </Box>

            <Button
              variant="contained"
              color={isEditMode ? 'error' : 'primary'}
              onClick={toggleEditMode}
            >
              {isEditMode ? '수정 완료' : '위젯 수정'}
            </Button>

            <Overview
              isEditMode={isEditMode}
              widgets={widgets}
              onUpdateWidgets={handleUpdateWidgets}
              studentId={currentStudentId}
            />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}