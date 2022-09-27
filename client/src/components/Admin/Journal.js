import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserTable from '../UserTables/userTable';

function Journal() {

    return (
    <Typography component="div" sx={{ marginTop: "45px" }}>
      <Box sx={{ minHeight: "500px", width: "100%"  }}>
        <UserTable/>
      </Box>
    </Typography>
  );
 }

export default Journal;