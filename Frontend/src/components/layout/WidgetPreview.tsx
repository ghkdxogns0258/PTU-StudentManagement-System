import React from 'react';
import Box from '@mui/material/Box';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import ProfileCard from '../widget/ProfileCard';
import SemesterGrade from '../widget/SemesterGrade';
import SemesterGradeChange from '../widget/SemesterGradeChange';
import GraduationRequirements from '../widget/GraduationRequirements';

interface WidgetPreviewProps {
  id: string;   // 위젯 고유 id (widgetId)
  name: string; // UI 표시용 이름
}

const WidgetPreview = ({ id, name }: WidgetPreviewProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `toolbox-${id}`,   // ✅ id 충돌 방지
    data: {
      from: 'toolbox',     // ✅ 드래그 출처 구분용
      widgetId: id,        // ✅ 위젯의 식별 id 전달
    },
  });

  // ✅ 디버깅용 로그 (원하면 삭제 가능)
  React.useEffect(() => {
    if (isDragging) {
      console.log(`[WidgetPreview] dragging ${id}`, {
        draggableId: `toolbox-${id}`,
        data: {
          from: 'toolbox',
          widgetId: id,
        },
      });
    }
  }, [isDragging, id]);

  const style = {
    transform: CSS.Transform.toString(transform) || 'none',
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    width: '200px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'opacity 0.2s ease', // 부드러운 피드백
  };

  const renderPreview = () => {
    switch (id) {
      case 'profileCard':
        return <ProfileCard id="preview" isEditMode={false} />;
      case 'semesterGrade':
        return <SemesterGrade id="preview" isEditMode={false} />;
      case 'semesterGradeChange':
        return <SemesterGradeChange id="preview" isEditMode={false} />;
      case 'graduationStatus':
        return <GraduationRequirements id="preview" isEditMode={false} />;
      default:
        return <div>{name}</div>;
    }
  };

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={style}
    >
      {renderPreview()}
    </Box>
  );
};

export default WidgetPreview;