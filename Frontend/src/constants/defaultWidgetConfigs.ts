import { WidgetConfig } from '../api/types/dashboard';

export const defaultWidgetConfigs: WidgetConfig[] = [
  { widgetId: 'profileCard', position: { sectionId: 'a1' }, order: 0 },
  { widgetId: 'semesterGradeChange', position: { sectionId: 'a2' }, order: 0 },
  { widgetId: 'semesterGrade', position: { sectionId: 'a3' }, order: 0 },
  { widgetId: 'graduationStatus', position: { sectionId: 'a4' }, order: 0 },
];
