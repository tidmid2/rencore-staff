import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';




const DataTable = ({
    rows,
    columns,
    loading,
    sx,
    onRowClick
}) => {

 
    // const [pageSize, setPageSize] = useState(2);

    return (
      <Box
      sx={{
        height: 300,
        width: '100%',
        '& .opo': {
          backgroundColor: '#DD0F0F',
          color: '#FFFFFF',
        },
        '& .ush': {
          backgroundColor: '#303F9F',
          color: '#FFFFFF',
        },
        '& .ver': {
          backgroundColor: '#2FB18A',
          color: '#FFFFFF',
        },
        '& .pri': {
          backgroundColor: '#00FFB2',
          color: '#000000',
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
            sortingMode="server"
            getCellClassName={(params) => {
              if (params.field === 'user_id' || params.value == null || params.field === 'dt' || params.field === 'time' || params.field === 'comment') {
                return '';
              }
              else  {
                if(params.value === 'Опоздал'  ){return 'opo';}
                else if(params.value === 'Ушел'  ){return 'ush';}
                else if(params.value === 'Вернулся'  ){return 'ver';}
                else if(params.value === 'Пришел'  ){return 'pri';}
              };
            }}
            onRowClick={onRowClick}
            
        />
        </Box>
    );
};

export default DataTable