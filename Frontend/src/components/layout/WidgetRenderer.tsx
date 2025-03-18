import * as React from 'react';
import ProfileCard from '../widget/ProfileCard';
import GraduationRequirements from '../widget/GraduationRequirements';
import SemesterGrade from '../widget/SemesterGrade';
import SemesterGradeChange from '../widget/SemesterGradeChange';

const widgetComponents: Record<string, React.FC<{ id: string; isEditMode: boolean }>> = {
  profileCard: ProfileCard,
  semesterGradeChange: SemesterGradeChange,
  semesterGrade: SemesterGrade,
  graduationStatus: GraduationRequirements,
};

interface WidgetRendererProps {
  sectionId: string; 
  isEditMode: boolean;
  studentId: string;  
}

export default function WidgetRenderer({ sectionId, isEditMode, studentId }: WidgetRendererProps) {
  const WidgetComponent = widgetComponents[sectionId];

  if (!WidgetComponent) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#999' }}>
        지원하지 않는 위젯입니다.
      </div>
    );
  }

  return (
    <div style={{ cursor: isEditMode ? 'grab' : 'default' }}>
      <WidgetComponent id={studentId} isEditMode={isEditMode} />
    </div>
  );
}