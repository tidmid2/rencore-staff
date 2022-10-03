import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useSignupMutation } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';

export default function SignUp({showAlert}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const id = await signup({
        email: data.get('email'),
        password: data.get('password'),
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
    }).unwrap();
    dispatch(showSnackbar({
      message: 'Регистрация прошла успешно',
      severity: 'success'
    }));
      navigate('/account');
      return id;
    } catch (err) {
      console.log(err);
      const errMsg = err?.data?.error?.data || 'Произошла ошибка при регистрации.'
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
           Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Адрес Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputProps= {{minLength:6, maxLength: 100}}
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегестрироваться
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2">
                У вас уже есть аккаунт? Войдите в аккаунт
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}