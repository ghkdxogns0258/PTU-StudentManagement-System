import { useState, useEffect } from 'react';
import { getWidgetsConfig, saveWidgetsConfig } from '../api/dashboard';
import { WidgetConfig } from '../api/types/dashboard';

const defaultWidgetConfigs: WidgetConfig[] = [
  { widgetId: 'profileCard', position: { sectionId: 'a1' }, order: 0 },
  { widgetId: 'semesterGradeChange', position: { sectionId: 'a2' }, order: 1 },
  { widgetId: 'semesterGrade', position: { sectionId: 'a3' }, order: 2 },
  { widgetId: 'graduationStatus', position: { sectionId: 'a4' }, order: 3 },
];

export function useDashboardWidgets() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ 최초 위젯 로딩
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

  // ✅ 순서 변경 및 드래그 후 상태 업데이트
  const handleUpdateWidgets = (newWidgets: WidgetConfig[]) => {
    setWidgets(newWidgets);
  };

  // ✅ 편집 모드 토글 및 저장
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

  // ✅ 위젯 추가
  const handleAddWidget = (widgetId: string) => {
    const exists = widgets.some((w) => w.widgetId === widgetId);
    if (exists) {
      console.warn('이미 추가된 위젯입니다:', widgetId);
      return;
    }

    const newWidget: WidgetConfig = {
      widgetId,
      order: widgets.length,
      position: { sectionId: 'a1' },
    };

    const updatedWidgets = [...widgets, newWidget];

    console.log('위젯 추가됨:', updatedWidgets);
    setWidgets(updatedWidgets);
  };

  // ✅ 위젯 삭제
  const handleRemoveWidget = (widgetId: string) => {
    const filtered = widgets.filter((w) => w.widgetId !== widgetId);

    const reordered = filtered.map((w, idx) => ({
      ...w,
      order: idx,
    }));

    setWidgets(reordered);
  };

  return {
    widgets,
    isEditMode,
    handleUpdateWidgets,
    toggleEditMode,
    handleAddWidget,
    handleRemoveWidget,
  };
}