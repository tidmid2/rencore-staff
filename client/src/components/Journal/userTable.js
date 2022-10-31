import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, CircularProgress, Button, TextField, Stack, Tooltip} from '@mui/material';

import {makeStyles} from '@material-ui/core/styles';


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
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  

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

  const[value, setValue] = useState(DT); 
  const[value2, setValue2] = useState(dt); 

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
    fetchData(value,value2);
  }, [value,value2]);
   
  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Сводный отчет
      </Typography>

      <Stack 
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
      >
        <Typography>
          С
        </Typography>

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
          <Typography>
            по
          </Typography>
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
      <TableContainer component={Paper} sx={{ marginTop: "45px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Отработано Дней</TableCell>
              <TableCell>Опоздание</TableCell>
              <TableCell>Отработано</TableCell>
            </TableRow>
          </TableHead>
          { isLoading ? 
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <CircularProgress />
            </Box> : <TableBody>
            { users.map((row) => (
              <TableRow key={row.user_id}>
                <TableCell  component="th" scope="row">
                  <Button component={Link}  to={"/journal/"+row.user_id+"/"+value2+"/"+value}>{row.user}</Button>
                </TableCell>

                <TableCell>
                  <Tooltip title="Пришел" sx={{ marginLeft: "auto" }}>
                    <Typography  className={classes.workdays}  
                      style={{
                        backgroundColor:
                          ((row.ydays>0 && '#56C114') ||
                          (row.ydays<=0 && 'white'))
                      }}
                    >
                      {row.ydays}
                    </Typography>
                  </Tooltip>

                  <Tooltip title="Опоздал дней" sx={{ marginLeft: "auto" }}>
                    <Typography className={classes.workdays}  style={{
                      backgroundColor:
                        ((row.zdays>0 && '#E55151') ||
                        (row.zdays<=0 && 'white'))
                      }}
                    >
                      {row.zdays}
                    </Typography>
                  </Tooltip>
                </TableCell>

                <TableCell>{row.late}</TableCell>

                <TableCell>{row.work}</TableCell>
              </TableRow>
            ))}
          </TableBody>}
        </Table>
      </TableContainer>
    </Box>
  );
}
