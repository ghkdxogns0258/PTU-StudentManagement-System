import { useState, useEffect } from 'react';
import { getWidgetsConfig, saveWidgetsConfig } from '../api/dashboard';
import { WidgetConfig } from '../api/types/dashboard';

const defaultWidgetConfigs: WidgetConfig[] = [
  { widgetId: 'profileCard', position: { sectionId: 'a1' }, order: 0 },
  { widgetId: 'semesterGradeChange', position: { sectionId: 'a2' }, order: 0 },
  { widgetId: 'semesterGrade', position: { sectionId: 'a3' }, order: 0 },
  { widgetId: 'graduationStatus', position: { sectionId: 'a4' }, order: 0 },
];

export function useDashboardWidgets() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const { widgets: fetched } = await getWidgetsConfig();
        if (!fetched || fetched.length === 0) {
          setWidgets(defaultWidgetConfigs);
        } else {
          setWidgets(fetched);
        }
      } catch (err) {
        console.error('getWidgetsConfig error:', err);
        setWidgets(defaultWidgetConfigs);
      }
    };

    fetchWidgets();
  }, []);

  const handleUpdateWidgets = (newWidgets: WidgetConfig[]) => {
    setWidgets(newWidgets);
  };

  const toggleEditMode = async () => {
    if (isEditMode) {
      try {
        const res = await saveWidgetsConfig(widgets);
        console.log('Saved:', res.message);
      } catch (err) {
        console.error('saveWidgetsConfig error:', err);
      }
    }
    setIsEditMode(!isEditMode);
  };

  return {
    widgets,
    isEditMode,
    handleUpdateWidgets,
    toggleEditMode,
  };
}
