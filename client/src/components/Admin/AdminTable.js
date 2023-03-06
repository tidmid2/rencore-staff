import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Stack,
  TextField,
  Modal,
} from "@mui/material";

import { useUpdateAdminCommentMutation } from "../../services/api";

import { showSnackbar } from "../../features/ui/uiSlice";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@mui/icons-material/Create";
// import * as XLSX from 'xlsx';

import Clear from "../MiniComponents/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function addZero(num) {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}

// function formatDate(date){
//   let comp='';
//   for(let i = 0; i < date.length; i++){
//     if(date[i]!=='T'){
//       comp+=date[i];
//     }
//     else{
//       return(comp);
//     }
//   }
// };
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
  dt: {
    fontWeight: "bold",
    // fontSize: '0.75rem',
    color: "white",
    backgroundColor: "grey",
    alignContent: "center",
    borderRadius: 35,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

function Row(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [document] = useUpdateAdminCommentMutation();
  const { row } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [userinfo, setUserinfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [userId, setUserId] = useState();
  const [ucomment, setUcomment] = useState();
  const [acomment, setAcomment] = useState();

  const handleOpen = () => {
    setOpenn(true);
  };
  const handleClose = () => setOpenn(false);

  const fetchData = async (user_id, dt) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/" + user_id + "/" + dt);
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

  // const handleClick = () => {
  //   var wb = XLSX.utils.book_new(),
  //   ws = XLSX.utils.json_to_sheet(userinfo);
  //   XLSX.utils.book_append_sheet(wb,ws,"Отчеты по сменам");
  //   XLSX.writeFile(wb,"Отчеты по сменам.xlsx");
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const idd = await document({
        comment: acomment,
        uid: userId,
      }).unwrap();
      dispatch(
        showSnackbar({
          message: "Комментарии оставлен",
          severity: "success",
        })
      );
      navigate("/");
      navigate("/admin");
    } catch (err) {
      console.log(err);
      const errMsg =
        err?.data?.error?.data || "Произошла ошибка при комментировании.";
      dispatch(
        showSnackbar({
          message: errMsg,
          severity: "error",
        })
      );
    }
  };

  const handleClick2 = async () => {
    setOpen(!open);
    if (!open) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await fetchData(row.user, new Date(row.dt).toLocaleDateString());
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick2}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">{row.user_id}</TableCell>
        <TableCell>{new Date(row.dt).toLocaleDateString()}</TableCell>
        <TableCell>
          <Typography
            className={classes.status}
            style={{
              backgroundColor:
                (row.time >= row.tmstart && "#E55151") ||
                (row.time < row.tmstart && "#56C114"),
            }}
          >
            {row.time}
          </Typography>
          <> </>
          <Typography
            className={classes.status}
            style={{
              backgroundColor:
                (row.office === true && "#56C114") ||
                (row.office === false && "#E55151"),
            }}
          >
            {row.office ? "Офис" : "УД"}
          </Typography>
        </TableCell>
        <TableCell>{row.comment}</TableCell>
        <TableCell>
          <Typography
            className={classes.status}
            style={{
              backgroundColor:
                (row.time2 < row.tmend && "#303F9F") ||
                // (row2.time2===null && '#E55151') ||
                (row.time2 >= row.tmend && "#56C114"),
            }}
          >
            {row.time2}
          </Typography>
        </TableCell>
        <TableCell>{row.comment2}</TableCell>
        <TableCell align="right">
          <CreateIcon
            onClick={() => {
              setUserId(row.uid);
              handleOpen();
            }}
          />
          <Modal
            open={openn}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography
                  display="flex"
                  justifyContent="center"
                  variant="h7"
                ></Typography>
                <TextField
                  inputProps={{
                    minLength: 0,
                    maxLength: 100,
                  }}
                  fullWidth
                  name="ad_comm"
                  type="text"
                  onChange={(e) => {
                    setAcomment(e.target.value);
                  }}
                  id="ad_comm"
                />
                <Button
                  type="submit"
                  // onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Оставить комменатарии
                </Button>
              </Box>
            </Box>
          </Modal>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {!isLoading ? (
              <>
                {userinfo.length !== 0 ? (
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      История отметок
                    </Typography>

                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Дата</TableCell>
                          <TableCell>Время</TableCell>
                          <TableCell>Комментарии</TableCell>
                          <TableCell align="right">Статус</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userinfo.map((row2) => (
                          <TableRow key={row2.uid}>
                            <TableCell scope="row">
                              {new Date(row2.dt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {row2.time}
                              <> </>
                              <Typography
                                className={classes.status}
                                style={{
                                  backgroundColor:
                                    (row2.office === true && "#56C114") ||
                                    (row2.office === false && "#E55151"),
                                }}
                              >
                                {row2.office ? "Офис" : "УД"}
                              </Typography>
                            </TableCell>
                            <TableCell>{row2.comment}</TableCell>
                            <TableCell align="right">
                              <Typography
                                className={classes.status}
                                style={{
                                  backgroundColor:
                                    (row2.id_op === "Опоздал" && "#E55151") ||
                                    (row2.id_op === "Ушел" && "#303F9F") ||
                                    (row2.id_op === "Вернулся" && "#2FB18A") ||
                                    (row2.id_op === "Пришел" && "#56C114"),
                                }}
                              >
                                {row2.id_op}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <CreateIcon
                                onClick={() => {
                                  setUserId(row2.uid);
                                  handleOpen();
                                }}
                              />
                              <Modal
                                open={openn}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{ mt: 3 }}
                                  >
                                    <Typography
                                      display="flex"
                                      justifyContent="center"
                                      variant="h7"
                                    ></Typography>
                                    <TextField
                                      inputProps={{
                                        minLength: 0,
                                        maxLength: 100,
                                      }}
                                      fullWidth
                                      name="ad_comm"
                                      type="text"
                                      onChange={(e) => {
                                        setAcomment(e.target.value);
                                      }}
                                      id="ad_comm"
                                    />
                                    <Button
                                      type="submit"
                                      fullWidth
                                      variant="contained"
                                      sx={{ mt: 3, mb: 2 }}
                                    >
                                      Оставить комменатарии
                                    </Button>
                                  </Box>
                                </Box>
                              </Modal>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* <Button onClick={handleClick}>Export</Button> */}
                  </Box>
                ) : (
                  <Clear />
                )}
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    uid: PropTypes.number.isRequired,
    dt: PropTypes.string,
    time: PropTypes.string.isRequired,
    tmstart: PropTypes.string.isRequired,
    tmend: PropTypes.string,
    comment: PropTypes.string,
    office: PropTypes.bool.isRequired,
    time2: PropTypes.string,
    comment2: PropTypes.string,
  }).isRequired,
  row2: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
    dt: PropTypes.string,
    time: PropTypes.string.isRequired,
    comment: PropTypes.string,
    status: PropTypes.string,
    id_op: PropTypes.string,
    id_smeny: PropTypes.string,
  }),
};

export default function AdminTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let date = new Date();
  let DT =
    addZero(date.getFullYear()) +
    "-" +
    addZero(date.getMonth() + 1) +
    "-" +
    addZero(date.getDate());
  const [value, setValue] = useState(DT);

  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const res = await fetch("/api/admin/" + value);
          if (res.status === 200) {
            let data = await res.json();
            setUsers(data);
          } else {
            console.log("Ошибка получения данных");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }, 1500);
    };

    fetchdata();
  }, [value]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Ежедневый отчет
      </Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
        <TextField
          id="date"
          mt={2}
          value={value}
          inputformat="YYYY-MM-DD"
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
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Сотрудник</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Время прихода</TableCell>
              <TableCell>Комментарии</TableCell>
              <TableCell>Время ухода</TableCell>
              <TableCell>Комментарии</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {users.map((row) => (
                <Row key={row.uid} row={row} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
