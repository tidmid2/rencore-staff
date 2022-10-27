import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../features/ui/uiSlice';
import { useUpdatePassMutation } from '../../services/api';
import { CircularProgress } from '@mui/material';
import Loading from '../UserTables/Loading';

export default function ResetPass({showAlert}) {
    const [tokenstatus, setTokenstatus] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reset] = useUpdatePassMutation();
    const {id,token} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
          // setIsLoading(true);
          const idd = await reset({password: data.get('password'), id: id, token: token}).unwrap();
          dispatch(showSnackbar({
            message: 'Пароль успешно обновлён',
            severity: 'success'
          }));
          // setIsLoading(false)
          navigate('/');
        } catch (err) {
          console.log(err);
          const errMsg = err?.data?.error?.data || 'Произошла ошибка при обновлении пароля.'
          dispatch(showSnackbar({
            message: errMsg,
            severity: 'error'
          }));
        }
      }

    const fetchData = async (id,token) => {
        setIsLoading(true);
        try{ 
          const response = await fetch('/api/auth/reset-password/'+id+'/'+token)
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
          const result = await response.json();
          setTokenstatus(result.status);
        } catch (err) {
          return err;
        } finally {
          setIsLoading(false);
      }};
  
    useEffect(() => {
        setTokenstatus(null);
        fetchData(id,token);
        
   }, [id,token]);

    if(tokenstatus===true){
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
             Введите новый пароль
            </Typography>
            <Box component="form" 
            onSubmit={handleSubmit}
             sx={{ mt: 3 }}>
              <Grid container spacing={2}>
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
                {/* <Grid item xs={12}>
                    <TextField
                    required
                    inputProps= {{minLength:6, maxLength: 100}}
                    fullWidth
                    name="password2"
                    label="Пароль"
                    type="password2"
                    id="password2"
                    onChange={handleChange}
                    autoComplete="new-password2"
                    />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Обновить пароль
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
   else{
    return(
      !isLoading ?        
    <Container component="main" maxWidth="xs">
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Typography component="h1" variant="h3">
        Ошибка!
        </Typography>
        <Typography component="h1" variant="h5">
        Токен не верифицирован.
        </Typography>
        <Typography component="h1" variant="h5">
        Попробуйте снова!
        </Typography>
        </Box>
    </Container> : <Loading></Loading> );
   }
}