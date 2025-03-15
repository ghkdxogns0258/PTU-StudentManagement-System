// /components/layout/WidgetRenderer.tsx

import * as React from 'react';
import ProfileCard from '../widget/ProfileCard';
import GraduationRequirements from '../widget/GraduationRequirements';
import SemesterGrade from '../widget/SemesterGrade';
import SemesterGradeChange from '../widget/SemesterGradeChange';

const widgetComponents: Record<string, React.FC> = {
  profileCard: ProfileCard,
  semesterGradeChange: SemesterGradeChange,
  semesterGrade: SemesterGrade,
  graduationStatus: GraduationRequirements,
};

interface WidgetRendererProps {
  sectionId: string;  // 이 값이 실은 widgetId 역할
  isEditMode: boolean;
}

export default function WidgetRenderer({ sectionId, isEditMode }: WidgetRendererProps) {
  const WidgetComponent = widgetComponents[sectionId];
  if (!WidgetComponent) {
    return null;
  }

  // props에 isEditMode를 전달할 필요가 있다면, 아래처럼 확장
  return (
    <div style={{ cursor: isEditMode ? 'grab' : 'default' }}>
      <WidgetComponent />
    </div>
  );
}
