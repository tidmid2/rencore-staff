import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useAuth } from "../../hooks/useAuth";
import AdminButton from './Adminbutton';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import logo from './favicon.ico';


export default function Nav({showAlert}) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [logoutOfApi] = useLogoutMutation();

  async function logout() {
    try {
        await logoutOfApi().unwrap();
        dispatch(logOut())
        dispatch(showSnackbar({
          message: 'Вы успешно вышли с аккаунта',
          severity: 'success'
        }));
        navigate('/');
    } catch(err) {
      dispatch(showSnackbar({
        message: 'Возникла проблема с выходом',
        severity: 'error'
      }));
    }
  }

  //burgermenu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          
          {/* Главная */}
          <Button component={Link} to="/" color="inherit">Главная</Button>
          { user && <Button component={Link} to="/document" color="inherit">Успеваемость</Button>}
          { user && <AdminButton/>}
          
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
              { user &&<MenuItem component={Link} to="/account" color="inherit">
                <Avatar /> Профиль
              </MenuItem> }

              { user && <Divider/> }

              { !user &&<MenuItem component={Link} to="/signin" color="inherit">
                <Avatar /> Войти
              </MenuItem> }

              { !user &&<MenuItem component={Link} to="/signup" color="inherit">
                <Avatar /> Зарегестрироваться
              </MenuItem> }

              { user && <MenuItem component={Link} to="/private" color="inherit">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Приватный вход 
              </MenuItem>}
{/* 
              { user && <MenuItem component={Link} to="/document" color="inherit">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Docs
              </MenuItem>} */}

              {user && <MenuItem color="inherit" onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small"/>
                </ListItemIcon>
                Выход 
              </MenuItem>}
              </Menu>
            </Box>    
        </Toolbar>
      </AppBar>
    </Box>
  );
}