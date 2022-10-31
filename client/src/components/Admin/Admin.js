import { Typography, Box } from '@mui/material';

import AdminTable from './AdminTable';

function Admin() {
  return (
  <Typography component="div" sx={{ marginTop: "45px" }}>
    <Box sx={{ minHeight: "500px", width: "100%"  }}>
      <AdminTable/>
    </Box>
  </Typography>
  );
}

export default Admin;