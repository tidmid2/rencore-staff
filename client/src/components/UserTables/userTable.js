import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
  status:{
      fontWeight: 'bold',
  fontSize: '0.75rem',
  color: 'white',
  backgroundColor: 'grey',
  borderRadius: 8,
  padding: '3px 10px',
  display: 'inline-block'
  },
  workdays:{
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
}
}));

function addZero(num) {
    if (num >= 0 && num <= 9) {
        return '0' + num;
    } else {
        return num;
    }
};

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  const classes = useStyles();
  let date = new Date();
    let DT = (
        addZero(date.getFullYear()) + '-' + 
        addZero(date.getMonth() + 1) + '-' +
        addZero(date.getDate())
        );
    let dt = (
        addZero(date.getFullYear()) + '-' + 
        addZero(date.getMonth() + 1) + '-' +
        addZero(date.getDate()-1)
            );
    // const [open, setOpen] = React.useState(true);
  

  //   var wb = XLSX.utils.book_new(),
  //   ws = XLSX.utils.json_to_sheet(users);

  //   XLSX.utils.book_append_sheet(wb,ws,"Отчеты по сменам");

  //   XLSX.writeFile(wb,"Отчеты по сменам.xlsx");
  // };

  const[value, setValue] = useState(DT); 
  const[value2, setValue2] = useState(dt); 
  // const handleClick = 
  // const fetchdata = useMemo(() => {
  //   fetchData(value,value2);
  // },[value,value2])
      const fetchData = async (value,value2) => {
      setIsLoading(true);
      try{ 
        const response = await fetch('/api/admin/dt1/'+value2+'/dt2/'+value)
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        setUsers(result);
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
    }};

  useEffect(() => {
//       // fetch('/api/admin/dt1/'+value2+'/dt2/'+value)
//       //    .then((response) => response.json())
//       //    .then((json) => setUsers(json))
//       //    .catch((error) => error)
      
      fetchData(value,value2);
//    // console.log(users);
 }, [value,value2]);
   
return (
    <Box>
    <Typography variant="h6" gutterBottom component="div">Сводный отчет</Typography>
    <Stack 
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={2}
    >
        <Typography>С</Typography>
    <TextField
        id="date"
        mt={2}
        value={value2}
        inputFormat="YYYY-MM-DD"
        label="Дата"
        type="date"
        sx={{ width: 150, marginLeft: "auto" }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {setValue2(e.target.value)}}
      />
        <Typography>по</Typography>
    <TextField
        id="date"
        mt={2}
        value={value}
        inputFormat="YYYY-MM-DD"
        label="Дата"
        type="date"
        sx={{ width: 150, marginLeft: "auto" }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {setValue(e.target.value)}}
      />
      <Button 
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '56px'}}
              onClick={() => {fetchData(value,value2)}}
        >
            Найти
        </Button>
    </Stack>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
                <TableCell>Сотрудник</TableCell>
                <TableCell>Отработано Дней</TableCell>
                <TableCell>Опоздание</TableCell>
                <TableCell>Отработано</TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? <Box sx={{display: "flex", justifyContent: "center",
        alignItems: "center"}}><CircularProgress /></Box> :<TableBody>
           {users.map((row) => (
            <TableRow
              key={row.user_id}
            >
                    <TableCell  component="th" scope="row">
                      <Button component={Link}  to={"/journal/"+row.user_id+"/"+value2+"/"+value}>{row.user}</Button>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Пришел" sx={{ marginLeft: "auto" }}>
                        <Typography  className={classes.workdays}  style={{
                                backgroundColor:
                                ((row.ydays>0 && '#56C114') ||
                                (row.ydays<=0 && 'white')
                                )
                                
                          }}>{row.ydays}
                        </Typography>
                      </Tooltip>
                      <Tooltip title="Опоздал дней" sx={{ marginLeft: "auto" }}>
                        <Typography className={classes.workdays}  style={{
                                backgroundColor:
                                ((row.zdays>0 && '#E55151') ||
                                (row.zdays<=0 && 'white')
                                )
                          }}>{row.zdays}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                        {row.late}
                    </TableCell>
                    <TableCell>
                        {row.work}
                    </TableCell>
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
  </Box>
);
}
