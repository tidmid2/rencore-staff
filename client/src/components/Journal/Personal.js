import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import {
  Stack,
  Select,
  TextField,
  Button,
  Paper,
  Typography,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  InputLabel,
  CircularProgress,
  MenuItem,
  FormControl,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  workdays: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const Personal = () => {
  const { user, dt1, dt2 } = useParams();

  const [users, setUsers] = useState([]);
  const [userss, setUserss] = useState([]);
  const [iduser, setIduser] = useState(user);
  const [value, setValue] = useState(dt2);
  const [value2, setValue2] = useState(dt1);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  const fetchData = async (iduser, value, value2) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/admin/user/" + iduser + "/dt1/" + value2 + "/dt2/" + value
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setUsers(result);
    } catch (err) {
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(iduser, value, value2)

    return;
  }, [iduser, value, value2]);


  useEffect(() => {

    fetch("/api/admin/admin/dt1/" + value2 + "/dt2/" + value)
      .then((response) => response.json())
      .then((json) => setUserss(json))
      .catch((error) => error);
      
      return;
  }, [value, value2]);

  const handleChange = (event) => setIduser(event.target.value);

  return (
    <Box sx={{ marginTop: "45px" }}>
      <Typography variant="h6" gutterBottom component="div">
        Сводный отчет по Сотруднику
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={3}
      >
        <FormControl sx={{ width: "250px" }}>
          <Box>
            <InputLabel id="demo-simple-select-label">Сотрудник</InputLabel>
            <Select
              fullWidth
              value={iduser ? iduser : ''}
              id="demo-simple-select-label"
              label="Сотрудник"
              onChange={handleChange}
            >
              {userss ? (
                userss.map((row) => (
                  <MenuItem key={row.row} value={row.user_id}>
                    {row.user}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={"0"} />
              )}
            </Select>
          </Box>
        </FormControl>

        <Typography>С</Typography>

        <TextField
          id="date"
          mt={2}
          value={value2 ? value2 : ''}
          inputFormat="YYYY-MM-DD"
          label="Дата"
          type="date"
          sx={{ width: 150, marginLeft: "auto" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setValue2(e.target.value);
          }}
        />

        <Typography>по</Typography>

        <TextField
          id="date"
          mt={2}
          value={value ? value : ''}
          inputFormat="YYYY-MM-DD"
          label="Дата"
          type="date"
          sx={{ width: 150, marginLeft: "auto" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, height: "56px" }}
          onClick={() => {
            fetchData(iduser, value, value2);
          }}
        >
          Найти
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ marginTop: "45px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Время прихода</TableCell>
              <TableCell>Опоздание</TableCell>
              <TableCell>Отработано</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <CircularProgress justifyContent="center" 
                alignItems="center"/>
            </Box>
          ) : (
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.row}>
                  <TableCell  scope="row">
                    {new Date(row.dt).toLocaleDateString()}
                  </TableCell>

                  <TableCell  scope="row">
                    <Typography>{row.user}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      className={classes.workdays}
                      style={{
                        backgroundColor:
                          (row.statred > "09:00:00" && "#E55151") ||
                          (row.statred <= "09:00:00" && "#56C114"),
                      }}
                    >
                      {row.statred}
                    </Typography>
                  </TableCell>

                  <TableCell>{row.late}</TableCell>
                  <TableCell>{row.work}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Personal;
