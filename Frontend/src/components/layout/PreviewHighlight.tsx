import React from 'react';
import Box from '@mui/material/Box';

interface PreviewHighlightProps {
  previewPosition: {
    rowStart: number;
    colStart: number;
    width: number;
    height: number;
  } | null;
  maxColumns?: number;
  maxRows?: number;
}

const PreviewHighlight = ({
    previewPosition,
    maxColumns = 4,
    maxRows = 2,
  }: PreviewHighlightProps) => {
    if (!previewPosition) {
      console.log('[PreviewHighlight] 렌더 안 함 (null)');
      return null;
    }
  
    const { rowStart, colStart, width, height } = previewPosition;
  
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
          gridTemplateRows: `repeat(${maxRows}, 1fr)`,
          pointerEvents: 'none',
          zIndex: 9999,
          border: '2px dashed rgba(0, 123, 255, 0.5)', // 부드러운 테두리
          backgroundColor: 'rgba(0, 123, 255, 0.2)', // 약간의 배경색 추가
        }}
      >
        <Box
          sx={{
            gridColumn: `${colStart} / span ${width}`,
            gridRow: `${rowStart} / span ${height}`,
            border: '2px solid #1976d2', // 테두리 줄여서 표시
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
        />
      </Box>
    );
  };
  

export default PreviewHighlight;