import http from './http';
import { WidgetConfig, WidgetListItem, WidgetPosition } from './types/dashboard';

// 📌 현재 설정된 위젯 배치 조회
export const getWidgetsConfig = async (): Promise<{ widgets: WidgetConfig[] }> => {
  const res = await http.get<{ widgets: WidgetConfig[] }>('/dashboard/widgets-config');
  return res.data;
};

// 📌 위젯 배치 저장 (위젯의 위치를 sectionId로 저장)
export const saveWidgetsConfig = async (widgets: WidgetConfig[]): Promise<{ message: string }> => {
  const res = await http.put<{ message: string }>('/dashboard/widgets-config', { widgets });
  return res.data;
};

// 📌 전체 위젯 데이터 조회
export const getWidgetsData = async (): Promise<any> => {
  const res = await http.get('/dashboard/widgets-data');
  return res.data;
};

// 📌 추가 가능한 위젯 목록 조회
export const getAvailableWidgets = async (): Promise<{ widgets: WidgetListItem[] }> => {
  const res = await http.get<{ widgets: WidgetListItem[] }>('/dashboard/widgets-list');
  return res.data;
};

// 📌 새로운 위젯 추가 (sectionId와 order로만 위젯 추가)
export const addWidget = async (widgetId: string, position: WidgetPosition, order: number): Promise<{ message: string }> => {
  const res = await http.post<{ message: string }>('/dashboard/widgets-config/add', {
    widgetId,
    position,
    order,
  });
  return res.data;
};

// 📌 위젯 삭제
export const removeWidget = async (widgetId: string): Promise<{ message: string }> => {
  const res = await http.delete<{ message: string }>(`/dashboard/widgets-config/remove?widgetId=${widgetId}`);
  return res.data;
};
