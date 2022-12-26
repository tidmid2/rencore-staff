import { Typography, Box } from '@mui/material';

import UserTable from './userTable';
function Journal() {

    return (
    <Typography component="div">
      <Box sx={{ minHeight: "500px", width: "100%"  }}>
        <UserTable/>
      </Box>
    </Typography>
  );
 }

export default Journal;