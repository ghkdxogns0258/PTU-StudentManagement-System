import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface ClientTabsProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}

export default function ClientTabs({ selectedTab, setSelectedTab }: ClientTabsProps) {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="기본 정보" value="basic" />
        <Tab label="학업 정보" value="academic" />
        <Tab label="상담 정보" value="counseling" />
        <Tab label="진로 정보" value="career" />
      </Tabs>
    </Box>
  );
}
