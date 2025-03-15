// /pages/Dashboard.tsx

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import AppNavbar from '../components/layout/AppNavbar';
import Header from '../components/layout/Header';
import SideMenu from '../components/navigation/SideMenu';
import AppTheme from '../theme/AppTheme';

import { getWidgetsConfig, saveWidgetsConfig } from '../api/dashboard';
import { WidgetConfig } from '../api/types/dashboard';

// 기본 레이아웃 (없을 때 fallback)
import { defaultWidgetConfigs } from '../constants/defaultWidgetConfigs';

// Droppable/Draggable 구현된 Overview
import { Overview } from '../components/layout/MainGrid';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [widgets, setWidgets] = React.useState<WidgetConfig[]>([]);

  // 1) 컴포넌트 마운트 시점에 서버에서 위젯 레이아웃 불러옴
  React.useEffect(() => {
    (async () => {
      try {
        const { widgets: fetched } = await getWidgetsConfig();
        // 비어 있으면 기본 레이아웃을 사용
        if (!fetched || fetched.length === 0) {
          setWidgets(defaultWidgetConfigs);
        } else {
          setWidgets(fetched);
        }
      } catch (err) {
        console.error('getWidgetsConfig error:', err);
        // 서버 에러 등으로 못 불러오면 기본 레이아웃
        setWidgets(defaultWidgetConfigs);
      }
    })();
  }, []);

  // 2) Overview에서 드래그&드롭 결과가 들어오면 state 업데이트
  const handleUpdateWidgets = (newWidgets: WidgetConfig[]) => {
    setWidgets(newWidgets);
  };

  // 3) 수정 모드 토글
  const toggleEditMode = async () => {
    if (isEditMode) {
      // “수정 완료” 시점에 서버 저장
      try {
        const res = await saveWidgetsConfig(widgets);
        console.log('Saved:', res.message);
      } catch (err) {
        console.error('saveWidgetsConfig error:', err);
      }
    }
    setIsEditMode(!isEditMode);
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
            />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
