import Typography from '@mui/material/Typography';
import AdminTable from '../UserTables/adminTables';
import Box from '@mui/material/Box';

function Admin() {

    return (
    <Typography component="div" sx={{ marginTop: "45px" }}>
      <Box sx={{ minHeight: "500px", width: "100%"  }}>
        <Box>123</Box>
        <AdminTable/>
      </Box>
    </Typography>
  );
 }

export default Admin;