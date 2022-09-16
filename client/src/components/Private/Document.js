import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserTable from '../UserTables/userTable';
import AddDocument from '../UserTables/addDocument';


function Document() {
  return(
    <Typography component="div" sx={{ marginTop: "45px" }}>
        <Box sx={{ width: "100%"  }}>
          <AddDocument/>
          <UserTable/>
        </Box>
    </Typography>
  );
}

export default Document;