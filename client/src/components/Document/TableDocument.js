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
  Modal,
  TextField,
  Button,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CreateIcon from "@mui/icons-material/Create";

import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../../hooks/useAuth";
import Clear from "../MiniComponents/Clear";
import Load from "../MiniComponents/Loading";
import { useUpdateCommentMutation } from "../../services/api";

import { showSnackbar } from "../../features/ui/uiSlice";

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
}));

function Row(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [document] = useUpdateCommentMutation();

  const { row } = props;
  const classes = useStyles();
  const { user } = useAuth();

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

  const fetchData = async (id_smeny) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/document/id/" + user.id + "/id_smeny/" + id_smeny
      );
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
    setOpen(!open);
    if (!open) {
      isLoading ? <Load /> : fetchData(row.id_smeny);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const idd = await document({
        comment: ucomment,
        uid: userId,
      }).unwrap();
      dispatch(
        showSnackbar({
          message: "Комментарии обновлен",
          severity: "success",
        })
      );
      navigate("/");
      navigate("/document");
    } catch (err) {
      console.log(err);
      const errMsg =
        err?.data?.error?.data || "Произошла ошибка при смене комментарии.";
      dispatch(
        showSnackbar({
          message: errMsg,
          severity: "error",
        })
      );
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{new Date(row.dt).toLocaleDateString()}</TableCell>
        <TableCell>
          {row.time}
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
        <TableCell align="right">
          <Typography
            className={classes.status}
            style={{
              backgroundColor:
                (row.id_op === "Опоздал" && "#E55151") ||
                (row.id_op === "Ушел" && "#303F9F") ||
                (row.id_op === "Вернулся" && "#2FB18A") ||
                (row.id_op === "Пришел" && "#56C114"),
            }}
          >
            {row.id_op}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <CreateIcon
            onClick={() => {
              setUserId(row.uid);
              handleOpen();
              setUcomment(row.comment);
              setAcomment(row.ad_comment);
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
                <Typography display="flex" justifyContent="center" variant="h7">
                  Ваш комментарии
                </Typography>
                <TextField
                  inputProps={{ minLength: 0, maxLength: 100 }}
                  fullWidth
                  name="comm"
                  type="text"
                  defaultValue={ucomment}
                  id="comm"
                  onChange={(e) => {
                    setUcomment(e.target.value);
                  }}
                />

                <Typography display="flex" justifyContent="center" variant="h7">
                  Комментарии Администратора
                </Typography>
                <TextField
                  inputProps={{ minLength: 0, maxLength: 100 }}
                  fullWidth
                  name="ad_comm"
                  type="text"
                  value={acomment}
                  disabled
                  id="ad_comm"
                />
                <Button
                  type="submit"
                  // onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Сменить комменатарии
                </Button>
              </Box>
            </Box>
          </Modal>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {userinfo.length !== 0 ? (
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
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  {!isLoading ? (
                    <TableBody>
                      {userinfo.map((row2) => (
                        <TableRow key={row2.uid}>
                          <TableCell scope="row">
                            {row2.time}
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
                                setUcomment(row2.comment);
                                setAcomment(row2.ad_comment);
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
                                  >
                                    Ваш комментарии
                                  </Typography>
                                  <TextField
                                    inputProps={{ minLength: 0, maxLength: 100 }}
                                    fullWidth
                                    name="comm"
                                    type="text"
                                    defaultValue={ucomment}
                                    id="comm"
                                    onChange={(e) => {
                                      setUcomment(e.target.value);
                                    }}
                                  />

                                  <Typography
                                    display="flex"
                                    justifyContent="center"
                                    variant="h7"
                                  >
                                    Комментарии Администратора
                                  </Typography>
                                  <TextField
                                    inputProps={{
                                      minLength: 0,
                                      maxLength: 100,
                                    }}
                                    fullWidth
                                    name="ad_comm"
                                    type="text"
                                    value={acomment}
                                    disabled
                                    id="ad_comm"
                                    autoFocus
                                  />
                                  <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                  >
                                    Сменить комменатарии
                                  </Button>
                                </Box>
                              </Box>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <Load />
                  )}
                </Table>
              </Box>
            ) : (
              <Clear />
            )}
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
    office: PropTypes.bool.isRequired,
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
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //new fetchdata
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("/api/document/id/" + user.id);
        if (res.status === 200) {
          let data = await res.json();
          setUsers(data);
          setIsLoading(false);
        } else {
          console.log("Ошибка получения данных");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return fetchdata();
  }, [user]);

  // old fetchdata
  // useEffect(() => {
  //   fetch('/api/document/id/' + user.id)
  //     .then((response) => response.json())
  //     .then((json) => setUsers(json), setIsLoading(false))
  //     .catch((error) => error)

  //     return ;
  // }, [user]);

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
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <TableBody>
            {users.map((row) => (
              <Row key={row.uid} row={row} />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
