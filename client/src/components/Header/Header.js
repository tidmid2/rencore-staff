import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Logout from "@mui/icons-material/Logout";

import { logOut } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../services/api";
import { showSnackbar } from "../../features/ui/uiSlice";
import { useAuth } from "../../hooks/useAuth";

import logo from "../../images/favicon.ico";

export default function Nav({ showAlert }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuth();
  const [logoutOfApi] = useLogoutMutation();

  const matches = useMediaQuery("(max-width: 600px)");
  const matches2 = useMediaQuery("(min-width: 600px)");
  const [urlcode, setUrlcode] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [getIP, setGetIP] = useState();

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  async function logout() {
    try {
      await logoutOfApi().unwrap();
      dispatch(logOut());
      document.location.reload();
      dispatch(
        showSnackbar({
          message: "Вы успешно вышли с аккаунта",
          severity: "success",
        })
      );
      localStorage.clear("x-access-token");
      navigate("/");
    } catch (err) {
      dispatch(
        showSnackbar({
          message: "Возникла проблема с выходом",
          severity: "error",
        })
      );
    }
  }

  const fetchData = async () => {
    try {
      const res = await axios.get("https://httpbin.org/ip");
      if (res.status === 200) {
        let data = res.data;
        setGetIP(data.origin);
      } else {
        console.log("Ошибка получения данных");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (getIP !== "82.200.148.114") {
      setUrlcode("Удаленно");
    } else {
      setUrlcode("Офис");
    }
    return;
  }, [getIP]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  return (
    <Box>
      <AppBar>
        <Toolbar>
          {/* Logo */}
          <Tooltip title="RenCore">
            <Toolbar>
              <Box
                component="img"
                sx={{ height: 64 }}
                alt="RenCore."
                src={logo}
                action="/home"
              />
            </Toolbar>
          </Tooltip>

          {/* Main Buttons */}
          {matches2 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Button component={Link} to="/" color="inherit">
                Главная
              </Button>
              {user && (
                <>
                  <Button component={Link} to="/document" color="inherit">
                    Успеваемость
                  </Button>

                  <Box>
                    {user.isadmin !== 1 ? (
                      <></>
                    ) : (
                      <>
                        <Button
                          id="basic-button3"
                          aria-controls={open3 ? "basic-menu3" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open3 ? "true" : undefined}
                          onClick={handleClick3}
                          color="inherit"
                        >
                          Admin
                        </Button>

                        <Menu
                          id="basic-menu3"
                          anchorEl={anchorEl3}
                          open={open3}
                          onClose={handleClose3}
                          MenuListProps={{
                            "aria-labelledby": "basic-button3",
                          }}
                        >
                          <MenuItem
                            component={Link}
                            to="/admin"
                            onClick={handleClose3}
                          >
                            Ежедневный отчет
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/journal"
                            onClick={handleClose3}
                          >
                            Сводный отчет
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/users"
                            onClick={handleClose3}
                          >
                            Пользователи
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </Box>
                </>
              )}
            </Box>
          )}

          {matches && (
            <Box color="white">
              <IconButton
                onClick={handleClick2}
                size="small"
                // sx={{ ml: 2 }}
                aria-controls={open2 ? "account-menu2" : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
              >
                <MoreVertIcon color="white" />
              </IconButton>

              <Menu
                anchorEl={anchorEl2}
                id="account-menu2"
                open={open2}
                onClose={handleClose2}
                // onClick={handleClose2}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      left: 107,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  component={Link}
                  to="/"
                  color="inherit"
                  onClick={handleClose2}
                >
                  Главная
                </MenuItem>
                {/* { user && <></>} */}
                {user && (
                  <Box>
                    <MenuItem
                      component={Link}
                      to="/document"
                      color="inherit"
                      onClick={handleClose2}
                    >
                      Успеваемость
                    </MenuItem>
                    <Divider />
                    {user.isadmin !== 1 ? (
                      <></>
                    ) : (
                      <>
                        <MenuItem
                          component={Link}
                          to="/admin"
                          color="inherit"
                          sx={{ textDecoration: "none" }}
                          onClick={handleClose2}
                        >
                          Ежедневный отчет
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/journal"
                          color="inherit"
                          sx={{ textDecoration: "none" }}
                          onClick={handleClose2}
                        >
                          Сводный отчет
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/users"
                          color="inherit"
                          sx={{ textDecoration: "none" }}
                          onClick={handleClose2}
                        >
                          Пользователи
                        </MenuItem>
                      </>
                    )}
                  </Box>
                )}
              </Menu>
            </Box>
          )}

          {/* Профиль */}
          <Box sx={{ marginLeft: "auto" }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              alignSelf="center"
              spacing={3}
            >
              <Box
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  color: "white",
                  // backgroundColor: "grey",
                  backgroundColor:
                    (urlcode !== "Офис" && "#E55151") ||
                    (urlcode === "Офис" && "#56C114"),
                  borderRadius: 8,
                  padding: "3px 10px",
                  display: "inline-block",
                }}
              >
                {urlcode}
              </Box>
              <Tooltip title="Аккаунт">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  // sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 32, height: 32, backgroundColor: "#DA532B" }}
                  ></Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* кнопки в профиле */}
          <Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {!user ? (
                <Box>
                  <MenuItem
                    component={Link}
                    to="/signin"
                    color="inherit"
                    key={1}
                  >
                    <Avatar /> Войти
                  </MenuItem>

                  <MenuItem
                    component={Link}
                    to="/signup"
                    color="inherit"
                    key={2}
                  >
                    <Avatar /> Зарегестрироваться
                  </MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem
                    component={Link}
                    to="/account"
                    color="inherit"
                    key={3}
                  >
                    <Avatar /> Профиль
                  </MenuItem>

                  <Divider />

                  <MenuItem color="inherit" onClick={logout} key={4}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Выход
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
