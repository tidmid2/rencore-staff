import React, { useEffect, useState } from 'react'
import DataTable from '../../services/dataTable.js';
import { useAuth } from '../../hooks/useAuth';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const columns = [
  {
    field: "dt",
    headerName: "Дата",
    width: 250,
    editable: false,
    type: 'date',
    valueGetter: (params) => new Date(params.row.dt),
  },
  {
    field: "time",
    headerName: "Время",
    width: 150,
    editable: false,
  },
  {
    field: "comment",
    headerName: "Комментарий",
    width: 400,
    editable: false
  },
  {
    field: "id_op",
    headerName: "",
    width: 150,
    editable: false
  }
];
const userTableStyles = {
    minHeight: '400px',
};

const UserTable = () => {
    // const [finalClickInfo, setFinalClickInfo] = useState();
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [users, setUsers] = useState([]);
    const [userinfo, setUserinfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

  const fetchData = async (id_smeny) => {
    setIsLoading(true);
    try{ 
      const response = await fetch('/api/document/id/' + user.id+'/id_smeny/'+id_smeny)
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setUserinfo(result);
    } catch (err) {
      return err;
    } finally {
      setIsLoading(false);
    }
  };
    
     useEffect(() => {
         fetch('/api/document/id/' + user.id)
            .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch((error) => error)
      // console.log(users);
    }, [user]);
 
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            onClick={handleClose}
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
            <DataTable 
              rows={userinfo}
              columns={columns}
              loading={isLoading}
              sx={style}
              onCellClick={() => {
                setOpen(false);
              }}
            />
          </Box>
        </Modal>

        <DataTable
            // autoHeight
            rows={users}
            columns={columns}
            loading={!users}
            sx={userTableStyles}
            onRowClick={(params) => {
              // setFinalClickInfo(params);
              setOpen(true);
              fetchData(params.row.id_smeny);
            }}
        />
        
      </Box>
    );
};

export default UserTable