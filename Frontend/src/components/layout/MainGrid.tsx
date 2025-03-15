import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GraduationRequirements from '../widget/GraduationRequirements';
import CustomizedDataGrid from '../tables/CustomizedDataGrid';
import StatCard from '../cards/StatCard';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { WidgetConfig } from '../../api/types/dashboard';

interface OverviewProps {
  isEditMode: boolean;
  widgets: WidgetConfig[];
  onUpdateWidgets: (newWidgets: WidgetConfig[]) => void;
}

export function Overview({
  isEditMode,
  widgets,
  onUpdateWidgets,
}: OverviewProps) {
  const sections = ['a1','a2','a3','a4','b1','b2','b3','b4'];

  // 위젯을 섹션별로 grouping 후 order로 정렬
  const sectionMap = React.useMemo(() => {
    const map: Record<string, WidgetConfig[]> = {};
    sections.forEach(sec => (map[sec] = []));
    widgets.forEach(w => {
      map[w.position.sectionId].push(w);
    });
    // order 순서 정렬
    Object.keys(map).forEach(secId => {
      map[secId].sort((a, b) => a.order - b.order);
    });
    return map;
  }, [widgets, sections]);

  // 드래그 종료 시점에 섹션 변경/순서 변경 반영
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const movingWidget = widgets.find((w) => w.widgetId === draggableId);
    if (!movingWidget) return;

    const newWidgets = [...widgets];
    // 기존 위치에서 제거
    const oldIndex = newWidgets.findIndex((w) => w.widgetId === draggableId);
    if (oldIndex !== -1) {
      newWidgets.splice(oldIndex, 1);
    }
    // 새 섹션 / order
    movingWidget.position.sectionId = destination.droppableId;
    movingWidget.order = destination.index;
    newWidgets.push(movingWidget);

    // 해당 섹션 내 order 재정렬
    const sameSection = newWidgets.filter(
      (w) => w.position.sectionId === movingWidget.position.sectionId
    );
    sameSection.sort((a, b) => a.order - b.order);
    sameSection.forEach((item, idx) => {
      item.order = idx;
    });

    onUpdateWidgets(newWidgets);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        {sections.map((secId) => {
          const items = sectionMap[secId];
          return (
            <Grid item xs={12} sm={6} md={3} key={secId}>
              {/* ❗ Droppable이 항상 존재 (조건부로 제거 안 함) */}
              <Droppable droppableId={secId} isDropDisabled={!isEditMode}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: 200,
                      border: '1px dashed #ccc',
                      backgroundColor: snapshot.isDraggingOver
                        ? '#f0f4ff'
                        : 'transparent',
                      transition: 'background-color 0.2s',
                      padding: 8,
                    }}
                  >
                    {items.map((cfg, index) => (
                      // ❗ Draggable도 항상 존재
                      // 수정 모드가 아닐 때 isDragDisabled만 true로
                      <Draggable
                        key={cfg.widgetId}
                        draggableId={cfg.widgetId}
                        index={index}
                        isDragDisabled={!isEditMode}
                      >
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            style={{
                              marginBottom: 8,
                              background: '#fff',
                              boxShadow: dragSnapshot.isDragging
                                ? '0 0 10px rgba(0,0,0,0.2)'
                                : 'none',
                              userSelect: 'none',
                              ...dragProvided.draggableProps.style,
                            }}
                          >
                            {/* 실제 위젯 렌더링 (profileCard, semesterGrade 등) */}
                            <StatCard
                              sectionId={cfg.widgetId}
                              isEditMode={isEditMode}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
  );
}

// ✅ Details 섹션 함수
export function Details() {
  return (
    <>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        지도학생
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} lg={9}>
          <CustomizedDataGrid />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <GraduationRequirements />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
