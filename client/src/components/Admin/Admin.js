import Typography from '@mui/material/Typography';
import AdminTable from '../UserTables/adminTables';
import Box from '@mui/material/Box';

function Admin() {

    return (
    <Typography component="div" sx={{ marginTop: "45px" }}>
      <Box sx={{ width: "100%"  }}>
        <AdminTable/>
      </Box>
    </Typography>
  );
 }

export default Admin;