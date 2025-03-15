import { useEffect, useState } from 'react';
import { getWidgetsConfig, saveWidgetsConfig } from '../api/dashboard';
import { WidgetConfig } from '../api/types/dashboard';

const defaultWidgets: WidgetConfig[] = [
  { widgetId: 'profileCard', position: { sectionId: 'a1' }, order: 1 },
  { widgetId: 'semesterGradeChange', position: { sectionId: 'a2' }, order: 2 },
  { widgetId: 'semesterGrade', position: { sectionId: 'b3' }, order: 3 },
  { widgetId: 'graduationStatus', position: { sectionId: 'a4' }, order: 4 },
];

export const useDraggableWidgets = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const { widgets: fetchedWidgets } = await getWidgetsConfig();
        if (fetchedWidgets.length > 0) {
          setWidgets(fetchedWidgets);
        }
      } catch (error) {
        console.error('Error fetching widgets:', error);
      }
    };

    fetchWidgets(); // 한 번만 서버에서 데이터를 가져오는 함수 호출
  }, []); // 빈 배열을 넣어서 처음 컴포넌트가 마운트될 때만 실행

  // 위젯의 위치 변경
  const moveWidget = (widgetId: string, newSectionId: string) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.widgetId === widgetId
          ? { ...widget, position: { sectionId: newSectionId } }
          : widget
      )
    );
  };

  // 배치 저장
  const saveLayout = async () => {
    try {
      await saveWidgetsConfig(widgets);
      alert('위젯 배치가 저장되었습니다.');
    } catch (error) {
      console.error('Error saving widgets:', error);
    }
  };

  return { widgets, moveWidget, saveLayout };
};
