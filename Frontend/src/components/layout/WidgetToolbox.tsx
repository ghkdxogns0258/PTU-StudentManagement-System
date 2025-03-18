import React from 'react';
import Box from '@mui/material/Box';
import WidgetPreview from './WidgetPreview';

export default function WidgetToolbox({ widgets }: { widgets: { id: string; name: string }[] }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        backgroundColor: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 2,
        zIndex: 1000,
      }}
    >
      {widgets.map((widget) => (
        <WidgetPreview key={widget.id} id={widget.id} name={widget.name} />
      ))}
    </Box>
  );
}