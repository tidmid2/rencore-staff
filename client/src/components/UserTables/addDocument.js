import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
// import UserTable from './userTable';

import { useDocumentMutation } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';
// import addZero from '../../services/dateTime';

function addZero(num) {
    if (num >= 0 && num <= 9) {
        return '0' + num;
    } else {
        return num;
    }
}


export default function AddDocument({showAlert}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [document] = useDocumentMutation();
  const { user } = useAuth();

  //сохранение текущей даты
  let date = new Date();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let DT = (
        addZero(date.getFullYear()) + '-' + 
        addZero(date.getMonth() + 1) + '-' +
        addZero(date.getDate())
    );
      //сохранение текущей времени в переменную
    let TIME = (
      addZero(date.getHours()) + ':' +
      addZero(date.getMinutes()) + ':' +
      addZero(date.getSeconds())
    );
    let STATUS ;
    if (TIME<='09:00:00') {STATUS=true;}
    else {STATUS=false;}
    try {
    
      const id = await document({
        user_id: user.id,
        dt: DT,
        time: TIME,
        comment: data.get('comment'),
        status: STATUS
    }).unwrap();
    console.log(id);
    dispatch(showSnackbar({
      message: 'Вы успешно отметились',
      severity: 'success'
    }));
    navigate('/document');
    } catch (err) {
      console.log(err);
      const errMsg = err?.data?.error?.data || 'Произошла ошибка при отметке.'
      dispatch(showSnackbar({
        message: errMsg,
        severity: 'error'
      }));
    }
  }
  return (
   
      <Container component="main" maxWidth="xs">
       
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid item xs={12}>
                <TextField
                  inputProps= {{minLength:0, maxLength: 100}}
                  fullWidth
                  name="comment"
                  label="Комментарии"
                  id="comment"
                  autoFocus
                />
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Отметиться
            </Button>
          </Box>
      </Container>
  );
}