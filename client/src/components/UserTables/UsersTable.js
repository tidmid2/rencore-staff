import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
// import BlockIcon from '@mui/icons-material/Block';

const useStyles = makeStyles((theme) => ({
  status:{
      fontWeight: 'bold',
  fontSize: '0.75rem',
  color: 'white',
  backgroundColor: 'grey',
  borderRadius: 8,
  padding: '3px 10px',
  display: 'inline-block',
  color: 'black',
  },
}));

function Row(props) {
const { row } = props;
const classes = useStyles();
  const handleClick = () => {
    
  };
return (
  <React.Fragment>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
      </TableCell>
      <TableCell component="th" scope="row">
                      {row.email}
      </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell><Typography className={classes.status}  style={{
                                backgroundColor:
                                ((row.isadmin==='Администратор' && '#00FFB2') ||
                                (row.isadmin==='Пользователь' && '#E55151')
                                )
                          }}>
                           {row.isadmin}
                        </Typography></TableCell>
                    <TableCell align="right">
                      <Tooltip title="Изменить"><CreateIcon onClick={handleClick}/></Tooltip>
                      {/* <Tooltip title="Заблокировать" sx={{ marginLeft: "auto" }}><BlockIcon/></Tooltip> */}
                    </TableCell>
    </TableRow>
  </React.Fragment>
);
}

Row.propTypes = {
row: PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isadmin: PropTypes.string.isRequired,
}).isRequired,
};
export default function UsersTable() {
  const [users, setUsers] = useState([]);
 useEffect(() => {
  fetch('/api/admin/users')
     .then((response) => response.json())
     .then((json) => setUsers(json))
     .catch((error) => error)
}, []);
return (
  <Box sx={{ marginTop: "45px" }}>
  <Typography variant="h6" gutterBottom component="div">Пользователи</Typography>
  <TableContainer component={Paper} sx={{ marginTop: "45px" }}>
    <Table aria-label="collapsible table" >
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Сотрудник</TableCell>
          <TableCell>Имя</TableCell>
          <TableCell>Администратор</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((row) => (
          <Row key={row.uid} row={row} 
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Box>
);
}
