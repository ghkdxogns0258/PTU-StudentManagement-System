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
import WidgetToolbox from '../components/layout/WidgetToolbox';
import { useDashboardWidgets } from '../hooks/useDashboardWidgets';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSensor, useSensors, PointerSensor, DragEndEvent, DragOverEvent } from '@dnd-kit/core';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  const {
    widgets,
    isEditMode,
    handleUpdateWidgets,
    toggleEditMode,
    handleAddWidget,
    handleRemoveWidget,
  } = useDashboardWidgets();

  const [currentStudentId, setCurrentStudentId] = React.useState<string>('');
  const [studentList, setStudentList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // ✅ 수정된 handleDragEnd
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log('handleDragEnd active:', active);
    console.log('handleDragEnd over:', over);

    // ✅ 1. toolbox에서 드래그한 경우: 위젯 추가
    if (active.data.current?.from === 'toolbox') {
      const widgetId = active.data.current.widgetId;
      const exists = widgets.some((w) => w.widgetId === widgetId);

      if (!exists) {
        console.log('툴박스에서 추가한 위젯:', widgetId);
        handleAddWidget(widgetId);
      }

      return; // 툴박스는 여기서 처리 끝
    }

    // ✅ 2. 기존 위젯 순서 바꾸기
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex((w) => w.widgetId === active.id);
    const newIndex = widgets.findIndex((w) => w.widgetId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...widgets];
    const [movedWidget] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, movedWidget);

    const updatedWidgets = reordered.map((w, idx) => ({
      ...w,
      order: idx,
    }));

    handleUpdateWidgets(updatedWidgets);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    console.log('handleDragOver active:', active);
    console.log('handleDragOver over:', over);

    if (active.data.current?.from === 'toolbox') {
      const widgetId = active.data.current.widgetId;
      const exists = widgets.some((w) => w.widgetId === widgetId);

      if (!exists) {
        console.log('툴박스에서 드래그 오버 중:', widgetId);
        // 여기서 굳이 handleAddWidget 실행할 필요는 없음
        // handleDragEnd에서 최종 처리하도록 하는 게 더 명확함!
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
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
                pb: 10,
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
                onRemoveWidget={handleRemoveWidget}
                onAddWidget={handleAddWidget}
                studentId={currentStudentId}
              />

              {isEditMode && (
                <WidgetToolbox
                  widgets={[
                    { id: 'profileCard', name: '프로필 카드' },
                    { id: 'semesterGrade', name: '학기별 성적' },
                    { id: 'semesterGradeChange', name: '학기별 성적 변화' },
                    { id: 'graduationStatus', name: '졸업 요건 충족도' },
                  ]}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </DndContext>
  );
}