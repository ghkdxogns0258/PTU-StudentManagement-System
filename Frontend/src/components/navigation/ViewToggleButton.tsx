import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ViewToggleButtonProps {
  displayMode: string;
  setDisplayMode: (mode: string) => void;
}

export default function ViewToggleButton({ displayMode, setDisplayMode }: ViewToggleButtonProps) {
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newMode: string | null) => {
    if (newMode !== null) {
      setDisplayMode(newMode);
    }
  };

  return (
    <ToggleButtonGroup
      value={displayMode}
      exclusive
      onChange={handleChange}
      aria-label="View mode"
      sx={{ height: 36 }}
    >
      <ToggleButton value="single" aria-label="Single view">
        1개 보기
      </ToggleButton>
      <ToggleButton value="grid" aria-label="Grid view">
        4개 보기
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
