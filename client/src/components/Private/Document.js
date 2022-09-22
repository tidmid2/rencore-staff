import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CollapsibleTable from '../UserTables/collapsDate';
import AddDocument from '../UserTables/addDocument';

function Document() {
  return(
    <Typography component="div" sx={{ marginTop: "45px" }}>
        <Box sx={{ minHeight: "500px", width: "100%"  }}>
          <AddDocument/>
          <CollapsibleTable/>
        </Box>
    </Typography>
  );
}

export default Document;