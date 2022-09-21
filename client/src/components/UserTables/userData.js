// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../hooks/useAuth';
// import { DataGrid } from '@mui/x-data-grid';
// import Box from '@mui/material/Box';


// const UserTable = (
//     columns,
//     sx,
//     onCellClick,
//     smeny
//     ) => {
//     const { user } = useAuth();
//     const [userinfo, setUserinfo] = useState([]);
//     useEffect(() => {
//       fetch('/api/document/id/' + user.id+'/id_smeny/'+smeny)
//          .then((response) => response.json())
//          .then((json) => setUserinfo(json))
//          .catch((error) => error)
//     }, [user,smeny]);
    
 
//     return (
//     <Box
//         sx={{
//         height: 300,
//         width: '100%',
//         '& .opo1': {
//             backgroundColor: '#DD0F0F',
//             color: '#FFFFFF',
//         },
//         '& .ush1': {
//             backgroundColor: '#303F9F',
//             color: '#FFFFFF',
//         },
//         '& .ver1': {
//             backgroundColor: '#2FB18A',
//             color: '#FFFFFF',
//         },
//         '& .pri1': {
//             backgroundColor: '#00FFB2',
//             color: '#000000',
//         },
//         }}
//         >
//             <DataGrid 
//               rows={userinfo}
//               columns={columns}
//               loading={!userinfo}
//               sx={sx}
//               getRowId={(row) =>  row.uid}
//               isRowSelectable={() => false}
//               hideFooter={true}
//               sortingMode="server"
//               getCellClassName={(params) => {
//                 if (params.field === 'user_id' || params.value == null || params.field === 'dt' || params.field === 'time' || params.field === 'comment') {
//                   return '';
//                 }
//                 else  {
//                   if(params.value === 'Опоздал'  ){return 'opo1';}
//                   else if(params.value === 'Ушел'  ){return 'ush1';}
//                   else if(params.value === 'Вернулся'  ){return 'ver1';}
//                   else if(params.value === 'Пришел'  ){return 'pri1';}
//                 };
//               }}
//               onCellClick={onCellClick}
//             />
        
//       </Box>
//     );
// };

// export default UserTable