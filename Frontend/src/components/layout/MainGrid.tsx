import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragOverEvent,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import PreviewHighlight from './PreviewHighlight';
import { useWidgetPositions } from '../../hooks/useWidgetPositions';
import { WidgetConfig } from '../../api/types/dashboard';
import CustomizedDataGrid from '../tables/CustomizedDataGrid';
import GraduationRequirements from '../widget/GraduationRequirements';
import Typography from '@mui/material/Typography';

const MAX_COLUMNS = 4;
const MAX_ROWS = 2;

interface OverviewProps {
  isEditMode: boolean;
  widgets: WidgetConfig[];
  onUpdateWidgets: (newWidgets: WidgetConfig[]) => void;
  onRemoveWidget?: (widgetId: string) => void;
  onAddWidget?: (widgetId: string) => void;
  studentId: string;
}

export function Overview({
  isEditMode,
  widgets,
  onUpdateWidgets,
  onRemoveWidget,
  onAddWidget,
  studentId,
}: OverviewProps) {
  const theme = useTheme();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const {
    positions,
    getGridMap,
    removePosition,
  } = useWidgetPositions(widgets);

  const [previewPosition, setPreviewPosition] = React.useState<{
    rowStart: number;
    colStart: number;
    width: number;
    height: number;
  } | null>(null);

  const { setNodeRef, isOver } = useDroppable({ id: 'overview-dropzone' });

  const handleRemoveWidget = (widgetId: string) => {
    onRemoveWidget?.(widgetId);
    removePosition(widgetId);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    console.log('[handleDragOver] active:', active);
    console.log('[handleDragOver] over:', over);

    if (!active) return;

    if (!over) {
      console.log('[handleDragOver] over가 없음 → previewPosition 초기화');
      setPreviewPosition(null);
      return;
    }

    if (over.id !== 'overview-dropzone') {
      console.log('[handleDragOver] 드롭 가능한 overview가 아님 → previewPosition 초기화');
      setPreviewPosition(null);
      return;
    }

    if (active.data.current?.from === 'toolbox') {
      const widgetId = active.data.current.widgetId;
      const size = getWidgetSize(widgetId);
      const gridMap = getGridMap();

      console.log('[handleDragOver] gridMap 상태:', JSON.stringify(gridMap, null, 2));
      console.log('[handleDragOver] 위젯 크기:', size);

      const empty = findEmptySpace(gridMap, size);

      console.log('[handleDragOver] empty 위치:', empty);

      if (empty) {
        const preview = {
          rowStart: empty.row + 1,
          colStart: empty.col + 1,
          width: size.width,
          height: size.height,
        };

        console.log('[handleDragOver] previewPosition 업데이트:', preview);

        setPreviewPosition(preview);
      } else {
        console.log('[handleDragOver] 빈 공간 없음 → previewPosition 초기화');
        setPreviewPosition(null);
      }
    } else {
      console.log('[handleDragOver] toolbox가 아님 → previewPosition 초기화');
      setPreviewPosition(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log('[handleDragEnd] active:', active);
    console.log('[handleDragEnd] over:', over);

    setPreviewPosition(null);

    if (!over) return;

    if (
      active.data.current?.from === 'toolbox' &&
      over.id === 'overview-dropzone'
    ) {
      const widgetId = active.data.current.widgetId;
      const exists = widgets.some((w) => w.widgetId === widgetId);

      if (!exists) {
        console.log('[handleDragEnd] 신규 위젯 추가:', widgetId);
        onAddWidget?.(widgetId);
      }
      return;
    }

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

    onUpdateWidgets(updatedWidgets);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={widgets.map((w) => w.widgetId)}
        strategy={rectSortingStrategy}
      >
        <Box
          ref={setNodeRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${MAX_COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat(${MAX_ROWS}, 1fr)`,
            gap: 2,
            width: '100%',
            minHeight: '600px',
            p: 2,
            position: 'relative', // ✅ 필수
            backgroundColor: isOver
              ? 'rgba(25, 118, 210, 0.05)'
              : theme.palette.background.default,
          }}
        >
          <PreviewHighlight
            previewPosition={previewPosition}
            maxColumns={MAX_COLUMNS}
            maxRows={MAX_ROWS}
          />

          {widgets.map((cfg) => (
            <SortableItem
              key={cfg.widgetId}
              id={cfg.widgetId}
              cfg={cfg}
              isEditMode={isEditMode}
              studentId={studentId}
              onRemoveWidget={handleRemoveWidget}
              position={positions[cfg.widgetId]}
            />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}

function getWidgetSize(widgetId: string) {
  const widgetSizes: Record<string, { width: number; height: number }> = {
    profileCard: { width: 1, height: 2 },
    semesterGrade: { width: 2, height: 1 },
    graduationStatus: { width: 1, height: 2 },
    semesterGradeChange: { width: 2, height: 1 },
  };

  return widgetSizes[widgetId] || { width: 1, height: 1 };
}

function findEmptySpace(
  gridMap: boolean[][],
  size: { width: number; height: number }
) {
  const MAX_ROWS = gridMap.length;
  const MAX_COLUMNS = gridMap[0].length;

  console.log('[findEmptySpace] 시작', { MAX_ROWS, MAX_COLUMNS, size });

  for (let row = 0; row <= MAX_ROWS - size.height; row++) {
    for (let col = 0; col <= MAX_COLUMNS - size.width; col++) {
      let canPlace = true;

      for (let r = row; r < row + size.height; r++) {
        for (let c = col; c < col + size.width; c++) {
          if (gridMap[r][c]) {
            canPlace = false;
            break;
          }
        }
        if (!canPlace) break;
      }

      if (canPlace) {
        console.log('[findEmptySpace] 빈 공간 발견:', { row, col });
        return { row, col };
      }
    }
  }

  console.warn('[findEmptySpace] 빈 공간 없음');
  return null;
}

export function Details() {
  return (
    <>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        지도학생
      </Typography>
      <Box display="flex" gap={2}>
        <Box flex={3}>
          <CustomizedDataGrid />
        </Box>
        <Box flex={1}>
          <GraduationRequirements id="dummy-student-id" />
        </Box>
      </Box>
    </>
  );
}