import { Typography, Box } from '@mui/material';

import TableDocument from './TableDocument';
import AddDocument from './AddDocument';

function Document() {
  return(
    <Typography component="div" >
        <Box sx={{ minHeight: "500px", width: "100%"  }}>
          <AddDocument/>
          <TableDocument/>
        </Box>
    </Typography>
  );
}

export default Document;