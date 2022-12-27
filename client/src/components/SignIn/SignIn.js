import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useLoginMutation } from '../../services/api';
import { setCredentials } from '../../features/auth/authSlice';
import { showSnackbar } from '../../features/ui/uiSlice';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const user = await login({
        email: data.get('email'),
        password: data.get('password'),
    }).unwrap();
      dispatch(setCredentials({user}));
      dispatch(showSnackbar({
        message: 'Авторизация прошла успешно',
        severity: 'success'
      }));
      const token  =  user.token;
      localStorage.setItem("x-access-token", token);
      // setAuthToken(token);
      navigate('/document');
      
    } catch (err) {
      const errMsg = err?.data?.error?.data || 'Произошла ошибка.'
      dispatch(showSnackbar({
        message: errMsg,
        severity: 'error'
      }));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Войти в учетную запись
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Адрес Email"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>

          <Grid container justifyContent="space-around">
            <Grid item>
              <Link href="/resetpassword" variant="body2">
                {"Забыли пароль?"}
              </Link>
            </Grid>
            
            <Grid item xs={5}>
              <Link href="/signup" variant="body2" justifyContent="center">
                {"Нет учетной записи? Зарегестрируйтесь"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}