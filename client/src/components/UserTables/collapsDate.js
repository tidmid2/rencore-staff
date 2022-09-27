import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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
import { useAuth } from '../../hooks/useAuth';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
    status:{
        fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
    }
  }));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
   const [userinfo, setUserinfo] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const { user } = useAuth();
   const classes = useStyles();
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
   }
    finally {
     setIsLoading(false);
   }
 };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {setOpen(!open); fetchData(row.id_smeny);}}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell ><span>{ (new Date(row.dt)).toLocaleDateString() }</span></TableCell>
        <TableCell>{row.time}</TableCell>
        <TableCell>{row.comment}</TableCell>
        <TableCell align="right">
            <Typography className={classes.status} style={{
                            backgroundColor:
                            ((row.id_op==='Опоздал' && '#E55151') ||
                            (row.id_op==='Ушел' && '#303F9F') ||
                            (row.id_op==='Вернулся' && '#2FB18A') ||
                            (row.id_op==='Пришел' && '#56C114'))
                            }}>
                            {row.id_op}
            </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                История отметок
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Время</TableCell>
                    <TableCell>Комментарии</TableCell>
                    <TableCell align="right">Статус</TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? <CircularProgress color="secondary" /> : 
                 <TableBody>
                  {userinfo.map((row2) => (
                    <TableRow key={row2.uid}>
                      <TableCell component="th" scope="row">
                        {row2.time}
                      </TableCell>
                      <TableCell>{row2.comment}</TableCell>
                      <TableCell align="right">
                        <Typography className={classes.status}  style={{
                            backgroundColor:
                            ((row2.id_op==='Опоздал' && '#E55151') ||
                            (row2.id_op==='Ушел' && '#303F9F') ||
                            (row2.id_op==='Вернулся' && '#2FB18A') ||
                            (row2.id_op==='Пришел' && '#56C114'))
                            }}>
                            {row2.id_op}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
              </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    dt: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    comment: PropTypes.string,
    id_op: PropTypes.string.isRequired,
  }).isRequired,
  row2: PropTypes.shape({
    time: PropTypes.string.isRequired,
    comment: PropTypes.string,
    id_op: PropTypes.string.isRequired,
  }),
};


export default function CollapsibleTable() {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);  
    useEffect(() => {
        setIsLoading(true);
        fetch('/api/document/id/' + user.id)
           .then((response) => response.json())
           .then((json) => setUsers(json), setIsLoading(false))
           .catch((error) => error)
     // console.log(users);
   }, [user]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Дата</TableCell>
            <TableCell>Время</TableCell>
            <TableCell>Комментарии</TableCell>
            <TableCell align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? <CircularProgress color="secondary" /> : 
        <TableBody>
          {users.map((row) => (
            <Row key={row.uid} row={row} 
            />
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
  );
}
