import Typography from '@mui/material/Typography';
import UsersTable from '../UserTables/UsersTable';
import Box from '@mui/material/Box';

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