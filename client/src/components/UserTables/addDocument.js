import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import TextField from '@mui/material/TextField';
// import { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import * as React from 'react';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import FormHelperText from '@material-ui/core/FormHelperText';
import { showSnackbar } from '../../features/ui/uiSlice';
import { useDocumentMutation } from '../../services/api';

// function addZero(num) {
//     if (num >= 0 && num <= 9) {
//         return '0' + num;
//     } else {
//         return num;
//     }
// }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddDocument({showAlert}) {
  //добавление данных
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [document] = useDocumentMutation();
  const { user } = useAuth();
  //модальное окно
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // //RadioButton
  // const [value, setValue] = React.useState('');
  // const [error, setError] = React.useState(false);
  // const [helperText, setHelperText] = React.useState('Выберите опцию');

  //сохранение текущей даты
//   let date = new Date();
//   let operacii_type = 1;
  // let STATUS=true;
  //     STATUS=true;
  // }
  // else{
  //   STATUS=true;
  // }
    // STATUS = stat.status;
    // console.log(STATUS);
    
  const handleSubmit = async(e) => {
    e.preventDefault();

    // if (value === 'work') {
    //     // operacii_type=1;
    //     setError(false);
    // } else if (value === 'lunch') {
    //     // operacii_type=2;
    //     setError(true);
    // } else {
    //     setHelperText('Выберите опцию.');
    //     setError(true);
    // }

      
    const data = new FormData(e.currentTarget);

    
  //  сохранение текущей времени в переменную
    // let DT = (
    //     addZero(date.getFullYear()) + '-' + 
    //     addZero(date.getMonth() + 1) + '-' +
    //     addZero(date.getDate())
    // );
    
    // let TIME = (
    //   addZero(date.getHours()) + ':' +
    //   addZero(date.getMinutes()) + ':' +
    //   addZero(date.getSeconds())
    // );

    // if (TIME<='09:00:00') {
    //     if (operacii_type==1) {
    //         STATUS=true;
    //         operacii_type=2;
    //     }
    //     else{
    //         STATUS=true;
    //         operacii_type=3;
    //     }
    // }
    // else {
    //     if (operacii_type==1) {
    //         STATUS=false;
    //         operacii_type=1;
    //     }
    //     else{
    //         STATUS=true;
    //         operacii_type=4;
    //     }
    // }
    

    //добавление данных
    try {
        const id = await document({
          user_id: user.id,
          comment: data.get('comment')
      }).unwrap();
      dispatch(showSnackbar({
        message: 'Вы успешно отметились',
        severity: 'success'
      }));
       navigate('/');
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

  // const handleRadioChange = (event) => {
  //   setValue(event.target.value);
  //   setError(false);
  // };

  return (
    <Container component="main" maxWidth="xs">
      <Button
        onClick={handleOpen}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, }}
      >
        Отметиться
      </Button>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Grid item xs={12}> */}
          <TextField
            inputProps= {{minLength:0, maxLength: 100}}
            fullWidth
            name="comment"
            label="Комментарии"
            id="comment"
            autoFocus
          />
          {/* </Grid> */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* тут был radiogroup, но он портит стиль, позже нужно что-то придумать */}
            {/* <RadioGroup row aria-labelledby="operacii_type" value={value} onChange={handleRadioChange}>
              <FormControlLabel value="work" control={<Radio />} label="Работа" />
              <FormControlLabel disabled value="lunch" control={<Radio />} label="Обед" />
            </RadioGroup> */}
            
            {/* <FormHelperText>{helperText}</FormHelperText> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Отметиться
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}