import { Typography, Box } from '@mui/material';

import UsersTable from './UsersTable';

function Admin() {
  return (
  <Typography component="div" sx={{ marginTop: "45px" }}>
    <Box sx={{ minHeight: "500px", width: "100%"  }}>
      <UsersTable/>
    </Box>
  </Typography>
);
}

export default Admin;