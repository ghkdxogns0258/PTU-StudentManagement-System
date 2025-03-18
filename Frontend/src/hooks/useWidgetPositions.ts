import { useState, useEffect } from 'react';
import { WidgetConfig } from '../api/types/dashboard';

// 위젯별 크기 정의
const widgetSizes: Record<string, { width: number; height: number }> = {
  profileCard: { width: 1, height: 2 },
  semesterGrade: { width: 2, height: 1 },
  graduationStatus: { width: 1, height: 2 },
  semesterGradeChange: { width: 2, height: 1 },
};

// 그리드 사이즈
const MAX_COLUMNS = 4;
const MAX_ROWS = 2;

/**
 * 위젯 포지션을 관리하는 커스텀 훅
 * @param widgets 현재 위젯 목록
 */
export function useWidgetPositions(widgets: WidgetConfig[]) {
  const [positions, setPositions] = useState<
    Record<string, { rowStart: number; colStart: number }>
  >({});

  /**
   * 위젯 목록이 변경되었을 때 positions 재계산
   */
  useEffect(() => {
    const newPositions = calculateWidgetPositions(widgets);
    setPositions(newPositions);
  }, [widgets]);

  /**
   * 현재 positions을 기준으로 gridMap을 반환
   */
  const getGridMap = () => {
    return createGridMap(positions, widgets);
  };

  /**
   * 특정 위젯의 position만 제거
   * @param widgetId 삭제할 위젯 ID
   */
  const removePosition = (widgetId: string) => {
    setPositions((prev) => {
      const updated = { ...prev };
      delete updated[widgetId];
      return updated;
    });
  };

  /**
   * 전체 positions을 재설정
   */
  const resetPositions = () => {
    const newPositions = calculateWidgetPositions(widgets);
    setPositions(newPositions);
  };

  return {
    positions,
    setPositions,
    getGridMap,
    removePosition,
    resetPositions,
  };
}

/**
 * 위젯 위치 초기 배치 계산
 * @param widgets 위젯 목록
 */
function calculateWidgetPositions(widgets: WidgetConfig[]) {
  const gridMap = Array.from({ length: MAX_ROWS }, () =>
    Array.from({ length: MAX_COLUMNS }, () => false)
  );

  const positions: Record<string, { rowStart: number; colStart: number }> = {};

  widgets.forEach((widget) => {
    const size = widgetSizes[widget.widgetId] || { width: 1, height: 1 };
    const empty = findEmptySpace(gridMap, size);

    if (empty) {
      const { row, col } = empty;
      positions[widget.widgetId] = { rowStart: row + 1, colStart: col + 1 };

      for (let r = row; r < row + size.height; r++) {
        for (let c = col; c < col + size.width; c++) {
          gridMap[r][c] = true;
        }
      }
    } else {
      console.warn(`위젯(${widget.widgetId})을 배치할 공간이 없습니다.`);
    }
  });

  return positions;
}

/**
 * 현재 positions 상태로부터 gridMap 생성
 * @param positions 위젯 positions 정보
 * @param widgets 위젯 목록
 */
function createGridMap(
  positions: Record<string, { rowStart: number; colStart: number }>,
  widgets: WidgetConfig[]
) {
  const gridMap = Array.from({ length: MAX_ROWS }, () =>
    Array.from({ length: MAX_COLUMNS }, () => false)
  );

  widgets.forEach((widget) => {
    const pos = positions[widget.widgetId];
    const size = widgetSizes[widget.widgetId] || { width: 1, height: 1 };

    if (!pos) return;

    const row = pos.rowStart - 1;
    const col = pos.colStart - 1;

    for (let r = row; r < row + size.height; r++) {
      for (let c = col; c < col + size.width; c++) {
        gridMap[r][c] = true;
      }
    }
  });

  return gridMap;
}

/**
 * 비어있는 위치 찾기
 * @param gridMap 현재 사용중인 grid map
 * @param size 위젯 사이즈
 */
function findEmptySpace(
  gridMap: boolean[][],
  size: { width: number; height: number }
) {
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

      if (canPlace) return { row, col };
    }
  }

  return null;
}