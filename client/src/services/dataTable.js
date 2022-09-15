// import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';



const DataTable = ({
    rows,
    columns,
    loading,
    sx
}) => {
    // const [pageSize, setPageSize] = useState(2);

    return (
        <DataGrid 
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            getRowId={(row: any) =>  row.uid}
            isRowSelectable={() => false}
            hideFooter={true} 
        />
    );
};

export default DataTable