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
 const classes = useStyles();
  const fetchData = async (id) => {
  setIsLoading(true);
  try{ 
    const response = await fetch('/api/admin/smeny/'+id)
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
  const handleClick = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(userinfo);

    XLSX.utils.book_append_sheet(wb,ws,"Отчеты по сменам");

    XLSX.writeFile(wb,"Отчеты по сменам.xlsx");
  };

return (
  <React.Fragment>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => {
            setOpen(!open); 
            isLoading ? <CircularProgress color="secondary" /> : fetchData(row.uid);
          }}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell ><span>{ (new Date(row.dtstart)).toLocaleDateString() }</span></TableCell>
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
                  <TableCell>Сотрудник</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Время прихода</TableCell>
                  <TableCell>Комментарии</TableCell>
                  <TableCell>Время ухода</TableCell>
                  <TableCell>Комментарии</TableCell>
                </TableRow>
              </TableHead>
               <TableBody>
                {userinfo.map((row2) => (
                  <TableRow key={row2.uid}>
                    <TableCell component="th" scope="row">
                      {row2.user_id}
                    </TableCell>
                    <TableCell><span>{ (new Date(row2.dt)).toLocaleDateString() }</span></TableCell>
                    <TableCell>
                      <Typography className={classes.status}  style={{
                            backgroundColor:
                            ((row2.time>'09:00:00' && '#E55151') ||
                            (row2.time<='09:00:00' && '#56C114'))
                      }}>
                        {row2.time}
                      </Typography>
                    </TableCell>
                    <TableCell>{row2.comment}</TableCell>
                    <TableCell>
                    <Typography className={classes.status}  style={{
                            backgroundColor:
                            ((row2.time2<'18:00:00' && '#303F9F')||
                            // (row2.time2===null && '#E55151') ||
                            (row2.time2>'18:00:00' && '#56C114'))
                      }}>
                        {row2.time2}
                      </Typography>
                    </TableCell>
                    <TableCell>{row2.comment2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={handleClick}>Export</Button>
          </Box>
        </Collapse>
        
      </TableCell>
    </TableRow>
    
  </React.Fragment>
);
}

Row.propTypes = {
row: PropTypes.shape({
  dtstart: PropTypes.string.isRequired,
}).isRequired,
row2: PropTypes.shape({
  user_id: PropTypes.string.isRequired,
  dt: PropTypes.string,
  time: PropTypes.string.isRequired,
  comment: PropTypes.string,
  time2: PropTypes.string.isRequired,
  comment2: PropTypes.string.isRequired,
}),
};

export default function AdminTable() {
  const [users, setUsers] = useState([]);
  // const handleClick = () => {
  //   var wb = XLSX.utils.book_new(),
  //   ws = XLSX.utils.json_to_sheet(users);

  //   XLSX.utils.book_append_sheet(wb,ws,"Отчеты по сменам");

  //   XLSX.writeFile(wb,"Отчеты по сменам.xlsx");
  // };

  useEffect(() => {
      fetch('/api/admin/date')
         .then((response) => response.json())
         .then((json) => setUsers(json))
         .catch((error) => error)
   // console.log(users);
 }, []);

return (
  <Box sx={{ margin: 1 }}>
  <Typography variant="h6" gutterBottom component="div">Ежедневый отчет</Typography>
  <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Дата</TableCell>
          {/* <TableCell>Время</TableCell>
          <TableCell>Комментарии</TableCell>
          <TableCell align="right">Статус</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((row) => (
          <Row key={row.uid} row={row} 
          />
        ))}
      </TableBody>
    </Table>
    {/* <Button onClick={handleClick}>Export</Button> */}
  </TableContainer>
  </Box>
);
}
