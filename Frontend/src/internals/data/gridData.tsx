import * as React from 'react';
import { Chip } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { ManagedStudent } from '../../api/types/students'; 

// 위험도 상태 렌더링
function renderStatus(status: '안전' | '위험') {
  const colors: { [key: string]: 'success' | 'error' } = {
    안전: 'success',
    위험: 'error',
  };

  return (
    <Chip
      label={status || '알 수 없음'}
      color={colors[status] || 'default'}
      size="small"
    />
  );
}

// 활동 데이터 스파크라인 차트 렌더링
function renderSparklineCell(params: GridCellParams<ManagedStudent, number[]>) {
  const dataLabels = Array.from({ length: 30 }, (_, i) => `1월 ${i + 1}`);
  const value = params.value ?? [];

  if (value.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <span style={{ color: '#aaa', fontStyle: 'italic' }}>데이터 없음</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={params.colDef?.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data: dataLabels,
        }}
      />
    </div>
  );
}

// ✅ API 기준 컬럼 정의
export const columns: GridColDef<ManagedStudent>[] = [
  {
    field: 'studentId', // ✅ 필수 (DataGrid는 id 필드가 필요함)
    headerName: '학생 ID',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'name',
    headerName: '학생명',
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: 'riskLevel',
    headerName: '위험도',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as '안전' | '위험'),
  },
  {
    field: 'age',
    headerName: '나이',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'grade',
    headerName: '학년',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'gpa',
    headerName: '학점',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
    valueFormatter: (params) => params.value?.toFixed(2) ?? '-',
  },
  {
    field: 'conversions',
    headerName: '활동 데이터',
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
    sortable: false,
    filterable: false,
  },
];
