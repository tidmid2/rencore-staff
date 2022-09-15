// import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';



const DataTable = ({
    rows,
    columns,
    loading,
    sx
}) => {
    // const [pageSize, setPageSize] = useState(2);

    return (
        <Box
        sx={{
            height: 300,
            width: '100%',
            '& .super-app-theme--cell': {
              backgroundColor: 'rgba(224, 183, 60, 0.55)',
              color: '#1a3e72',
              fontWeight: '600',
            },
            '& .super-app.negative': {
              backgroundColor: 'rgba(157, 255, 118, 0.49)',
              color: '#1a3e72',
              fontWeight: '600',
            },
            '& .super-app.positive': {
              backgroundColor: '#d47483',
              color: '#1a3e72',
              fontWeight: '600',
            },
        }}
      >
        <DataGrid 
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            getRowId={(row) =>  row.uid}
            isRowSelectable={() => false}
            hideFooter={true} 
            initialState={{
                sorting: {
                  sortModel: [{ field: 'dt', sort: 'desc' }],
                }}}
        />
        </Box>
    );
};

export default DataTable