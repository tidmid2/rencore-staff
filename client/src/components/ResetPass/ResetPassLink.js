import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { showSnackbar } from '../../features/ui/uiSlice';
import { useResetMutation } from '../../services/api';

export default function ResetPassword({showAlert}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [reset] = useResetMutation();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
          // eslint-disable-next-line
          const id = await reset({
            email: data.get('email'),
            link: window.location.host,
        }).unwrap();
        dispatch(showSnackbar({
          message: 'На вашу почту была отправлена ссылка с восстановлением',
          severity: 'success'
        }));
          navigate('/');
          return null;
        } catch (err) {
          console.log(err);
          const errMsg = err?.data?.error?.data || 'Произошла ошибка при восстановлении.'
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

        <Typography component="h1" variant="h4">
          Введите ваш email для восстановление пароля
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Восстановить
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