import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { AppBar, Box, Toolbar, Button, Menu, MenuItem, Avatar, ListItemIcon, Divider, IconButton, Tooltip, Grid } from '@mui/material';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Logout from '@mui/icons-material/Logout';

import { logOut } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';
import { useAuth } from "../../hooks/useAuth";

import logo from '../../images/favicon.ico';

export default function Nav({showAlert}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useAuth();
  const [logoutOfApi] = useLogoutMutation();

  const matches = useMediaQuery("(max-width: 600px)");
  const matches2 = useMediaQuery("(min-width: 600px)");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  async function logout() {
    try {
        await logoutOfApi().unwrap();
        dispatch(logOut())
        dispatch(showSnackbar({
          message: 'Вы успешно вышли с аккаунта',
          severity: 'success'
        }));
        localStorage.clear('x-access-token');
        navigate('/');
    } catch(err) {
      dispatch(showSnackbar({
        message: 'Возникла проблема с выходом',
        severity: 'error'
      }));
    }
  }

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
                sx={{height: 64,}}
                alt="RenCore."
                src={logo}
                action="/home"
              />
            </Toolbar>
          </Tooltip>


          {/* Main Buttons */}
          {matches2 && 
            <Box 
              display="flex"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              <Button component={Link} to="/" color="inherit">Главная</Button>
              { user && <>
                <Button component={Link} to="/document" color="inherit" >
                  Успеваемость
                </Button>

                <Box>
                  { user.isadmin!==1 ? <></> :
                    <Button id="basic-button"
                      aria-controls={open3 ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open3 ? 'true' : undefined}
                      onClick={handleClick3}
                      color="inherit"
                    >
                      Admin
                    </Button>
                  }

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl3}
                    open={open3}
                    onClose={handleClose3}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem component={Link} to="/admin" onClick={handleClose3}>Ежедневный отчет</MenuItem>
                    <MenuItem component={Link} to="/journal" onClick={handleClose3}>Сводный отчет</MenuItem>
                    <MenuItem component={Link} to="/users" onClick={handleClose3}>Пользователи</MenuItem>
                  </Menu>
                </Box>
              </>}
            </Box>
          }
          
          { matches && 
            <Box color="white">
              <IconButton
                onClick={handleClick2}
                size="small"
                // sx={{ ml: 2 }}
                aria-controls={open2 ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? 'true' : undefined}
              >
                <MoreVertIcon color="white" />
              </IconButton>

              <Menu
                anchorEl={anchorEl2}
                id="account-menu"
                open={open2}
                onClose={handleClose2}
                // onClick={handleClose2}
                PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 107,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem component={Link} to="/" color="inherit" onClick={handleClose2}>Главная</MenuItem>
                {/* { user && <></>} */}
                { user && <>
                  <MenuItem component={Link} to="/document" color="inherit" onClick={handleClose2}>
                    Успеваемость
                  </MenuItem> 
                  <Divider/> 
                  { user.isadmin!==1 ? <></> : 
                    <MenuItem>
                      <Grid 
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={3}
                      >
                        <Grid item><Box component={Link} to="/admin" color="inherit" sx={{textDecoration: "none"}} onClick={handleClose2}>Ежедневный отчет</Box></Grid>
                        <Grid item><Box component={Link} to="/journal" color="inherit" sx={{textDecoration: "none"}} onClick={handleClose2}>Сводный отчет</Box></Grid>
                        <Grid item><Box component={Link} to="/users" color="inherit" sx={{textDecoration: "none"}} onClick={handleClose2}>Пользователи</Box></Grid>
                      </Grid>
                    </MenuItem>
                  }
                </>}
              </Menu>
            </Box>
          }
          
          
          {/* Профиль */}
          <Tooltip title="Аккаунт" sx={{ marginLeft: "auto" }}>
            <IconButton
              onClick={handleClick}
              size="small"
              // sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, backgroundColor: "#DA532B"}}></Avatar>
            </IconButton>
          </Tooltip>  

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
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              { !user ? 
                <>
                  <MenuItem component={Link} to="/signin" color="inherit">
                    <Avatar /> Войти
                  </MenuItem> 

                  <MenuItem component={Link} to="/signup" color="inherit">
                    <Avatar /> Зарегестрироваться
                  </MenuItem> 
                </> : <>
                  <MenuItem component={Link} to="/account" color="inherit">
                    <Avatar /> Профиль
                  </MenuItem> 

                  <Divider/>

                  <MenuItem color="inherit" onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small"/>
                    </ListItemIcon>
                    Выход 
                  </MenuItem>
                </>
              }
              </Menu>
            </Box>    
        </Toolbar>
      </AppBar>
    </Box>
  );
}