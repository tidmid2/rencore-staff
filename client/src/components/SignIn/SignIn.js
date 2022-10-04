import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';

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
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Нет учетной записи? Зарегестрируйтесь"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}