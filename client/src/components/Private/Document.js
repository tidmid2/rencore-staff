import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserTable from '../UserTables/userTable';


function Document() {
  return(
    <Typography component="div" sx={{ marginTop: "45px" }}>
        <Box sx={{ width: "100%"  }}>
          <UserTable/>
        </Box>
    </Typography>
  );
}

export default Document;