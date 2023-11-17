import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: '100vh' }}>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>

  );
}