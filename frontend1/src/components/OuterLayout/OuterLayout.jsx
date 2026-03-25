import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const OuterLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default OuterLayout;
