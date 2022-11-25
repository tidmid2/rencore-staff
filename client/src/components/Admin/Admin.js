import { Typography, Box } from '@mui/material';

import AdminTable from './AdminTable';

function Admin() {
  return (
  <Typography component="div">
    <Box sx={{ minHeight: "500px", width: "100%"  }}>
      <AdminTable/>
    </Box>
  </Typography>
  );
}

export default Admin;