import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/RemoveCircleOutline';
import { useTheme } from '@mui/material/styles';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import StatCard from '../cards/StatCard'; 

import { WidgetConfig } from '../../api/types/dashboard';

interface SortableItemProps {
  id: string; // widgetId
  cfg: WidgetConfig;
  isEditMode: boolean;
  studentId: string;
  onRemoveWidget?: (widgetId: string) => void;
  position: { rowStart: number; colStart: number };
}

const widgetSizes: Record<string, { width: number; height: number }> = {
  profileCard: { width: 1, height: 2 },
  semesterGrade: { width: 2, height: 1 },
  graduationStatus: { width: 1, height: 2 },
  semesterGradeChange: { width: 2, height: 1 },
};

const SortableItem = ({
  id,
  cfg,
  isEditMode,
  studentId,
  onRemoveWidget,
  position,
}: SortableItemProps) => {
  const theme = useTheme();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const size = widgetSizes[cfg.widgetId] || { width: 1, height: 1 };

  if (!position) return null;

  const style = {
    transform: CSS.Transform.toString(transform) || 'none',
    transition: transition || 'none',
    gridColumn: `${position.colStart} / span ${size.width}`,
    gridRow: `${position.rowStart} / span ${size.height}`,
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: isDragging
      ? theme.palette.action.selected
      : theme.palette.background.paper,
    boxShadow: isDragging
      ? '0px 0px 12px rgba(0,0,0,0.3)'
      : '0px 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '100%',
    position: 'relative',
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      sx={style}
      {...attributes}
      {...(isEditMode ? listeners : {})} // 편집 모드일 때만 드래그 허용
    >
      {isEditMode && (
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'error.main',
            color: '#fff',
            '&:hover': { backgroundColor: 'error.dark' },
            zIndex: 10,
          }}
          onClick={() => onRemoveWidget?.(cfg.widgetId)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}

      {/* 위젯 렌더링 영역 */}
      <StatCard
        sectionId={cfg.widgetId}
        isEditMode={isEditMode}
        studentId={studentId}
      />
    </Box>
  );
};

export default SortableItem;