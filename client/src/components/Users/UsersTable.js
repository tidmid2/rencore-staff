import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,Tooltip,Modal,TextField,Grid,Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

import CreateIcon from '@mui/icons-material/Create';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useUpdatePassAdminMutation, useBlockUserMutation, useDeleteCardMutation,useChangeTmendMutation,useChangeTmstartMutation, } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';

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

const useStyles = makeStyles((theme) => ({
  status:{
      fontWeight: 'bold',
  fontSize: '0.75rem',
  color: 'black',
  backgroundColor: 'grey',
  borderRadius: 8,
  padding: '3px 10px',
  display: 'inline-block',
  },
}));



function Row(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { row } = props;
  const classes = useStyles();

  const [document] = useUpdatePassAdminMutation();
  const [document1] = useBlockUserMutation();
  const [document2] = useDeleteCardMutation();
  const [document3] = useChangeTmstartMutation(); //change start time
  const [document4] = useChangeTmendMutation(); //change end time

  const [open, setOpen] = useState(false);
  const [typeBeat, setTypeBeat] = useState(0);
  const [userId, setUserId] = useState();

  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if(typeBeat!==4){
      if(typeBeat!==3){
        if(typeBeat!==2){
          if(typeBeat!==4){
            //change PASSWORD
            try {
              // eslint-disable-next-line 
              const idd = await document({
                password: data.get("password"),
                id: userId,
            }).unwrap();
            dispatch(showSnackbar({
              message: 'Вы успешно сменили пароль',
              severity: 'success'
            }));
            navigate('/');
            navigate('/users');
            } catch (err) {
              console.log(err);
              const errMsg = err?.data?.error?.data || 'Произошла ошибка при смене пароля.'
              dispatch(showSnackbar({
                message: errMsg,
                severity: 'error'
              }));
            }
          }
          else {
            //Разблокировать
            try {
              // eslint-disable-next-line 
              const idd = await document1({id: userId, blocked: false}).unwrap();
              dispatch(showSnackbar({
                message: 'Пользователь успешно разблокирован',
                severity: 'success'
              }));
            navigate('/');
            navigate('/users');
            } catch (err) {
              console.log(err);
              const errMsg = err?.data?.error?.data || 'Произошла ошибка при разблокировке пользователя.'
              dispatch(showSnackbar({
                message: errMsg,
                severity: 'error'
              }));
            }
          }
        }
        else{
          //Delete carad from user
          try {
            // eslint-disable-next-line 
            const idd = await document2({id: userId}).unwrap();
            dispatch(showSnackbar({
              message: 'Карточка успешно удалена',
              severity: 'success'
            }));
          navigate('/');
          navigate('/users');
          } catch (err) {
            console.log(err);
            const errMsg = err?.data?.error?.data || 'Произошла ошибка при удалении карточки.'
            dispatch(showSnackbar({
              message: errMsg,
              severity: 'error'
            }));
          }
        };
      }
      else{
        //block user
        try {
          // eslint-disable-next-line 
          const idd = await document2({id: userId}).unwrap();
          dispatch(showSnackbar({
            message: 'Пользователь успешно заблокирован',
            severity: 'success'
          }));
        navigate('/');
        navigate('/users');
        } catch (err) {
          console.log(err);
          const errMsg = err?.data?.error?.data || 'Произошла ошибка при блокировке пользователя.'
          dispatch(showSnackbar({
            message: errMsg,
            severity: 'error'
          }));
        }
      };
    } 
    else{ 
      //change time
      if ((data.get("tmstart")==='') && (data.get("tmend")==='')){
        dispatch(showSnackbar({
          message: 'Укажите время',
          severity: 'error'
        }));
      }
      else{
        if((data.get("tmstart")==='') && (data.get("tmend")!=='')){
          //change end time
          try {
            const idd = await document4({
              id: userId, 
              tmst: data.get("tmend")
            }).unwrap();
            dispatch(showSnackbar({
              message: 'Время конца работы успешно сменен',
              severity: 'success'
            }));
          navigate('/');
          navigate('/users');
          } catch (err) {
            console.log(err);
            const errMsg = err?.data?.error?.data || 'Произошла ошибка при смене времени.'
            dispatch(showSnackbar({
              message: errMsg,
              severity: 'error'
            }));
          };
        }
        else if((data.get("tmstart")!=='') && (data.get("tmend")==='')){
          //change start time
          try {
            // eslint-disable-next-line 
            const idd = await document3({
              id: userId, 
              tmst: data.get("tmstart")
            }).unwrap();
            dispatch(showSnackbar({
              message: 'Время начала работы успешно сменен',
              severity: 'success'
            }));
          navigate('/');
          navigate('/users');
          } catch (err) {
            console.log(err);
            const errMsg = err?.data?.error?.data || 'Произошла ошибка при смене времени.'
            dispatch(showSnackbar({
              message: errMsg,
              severity: 'error'
            }));
          }
        }
        else{
          //change both time
          try {
            const idd = await document3({
              id: userId, 
              tmst: data.get("tmstart")
            }).unwrap();
            dispatch(showSnackbar({
              message: 'Время начала работы успешно сменен',
              severity: 'success'
            }));
          navigate('/');
          navigate('/users');
          } catch (err) {
            console.log(err);
            const errMsg = err?.data?.error?.data || 'Произошла ошибка при смене времени.'
            dispatch(showSnackbar({
              message: errMsg,
              severity: 'error'
            }));
          };

          try {
            const idd = await document4({
              id: userId, 
              tmst: data.get("tmend")
            }).unwrap();
            dispatch(showSnackbar({
              message: 'Время конца работы успешно сменен',
              severity: 'success'
            }));
          navigate('/');
          navigate('/users');
          } catch (err) {
            console.log(err);
            const errMsg = err?.data?.error?.data || 'Произошла ошибка при смене времени.'
            dispatch(showSnackbar({
              message: errMsg,
              severity: 'error'
            }));
          };
        }
        
        
      }
    };
  }
return (
  <React.Fragment>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
        <Typography className={classes.status}  
          style={{
            backgroundColor:
              ((row.blocked===false && '#00FFB2') ||
              (row.blocked===true && '#E55151'))
          }}
        >
          { row.blocked===true ? "Заблокирован" : "Активен"}
        </Typography>
      </TableCell>

      <TableCell scope="row">{row.email}</TableCell>

      <TableCell>{row.name}</TableCell>

      <TableCell>{row.tmstart}</TableCell>

      <TableCell>{row.tmend}</TableCell>

      <TableCell>
        <Typography className={classes.status}  
          style={{
            backgroundColor:
              ((row.isadmin==='Администратор' && '#00FFB2') ||
              (row.isadmin==='Пользователь' && '#E55151'))
          }}
        >
          {row.isadmin}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Grid 
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item><Tooltip title="Изменить"><CreateIcon onClick={()=>{setUserId((row.id)); setTypeBeat(1); handleOpen();}}/></Tooltip></Grid>
          <Grid item><Tooltip title="Удалить карточку"><CreditCardOffIcon onClick={()=>{setUserId((row.id)); setTypeBeat(2); handleOpen();}}/></Tooltip></Grid>
          <Grid item>{ row.blocked!==true ? <><Tooltip title="Заблокировать"><BlockIcon onClick={()=>{setUserId((row.id)); setTypeBeat(3); handleOpen();}}/></Tooltip></> : <><Tooltip title="Разблокировать"><CheckIcon onClick={()=>{setUserId((row.id)); setTypeBeat(4); handleOpen();}}/></Tooltip></>}</Grid>
          <Grid item><Tooltip title="Сменить время"><AccessTimeIcon onClick={()=>{setUserId((row.id)); setTypeBeat(4); handleOpen();}}/></Tooltip></Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              { typeBeat!==4 ? <> { 
                  typeBeat!==3 ? <>{
                  typeBeat!==2 ? <>
                    { typeBeat!==1 ? <>
                        <Typography display="flex" justifyContent="center" variant="h6">Разблокировать пользователя?</Typography>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Разблокировать
                        </Button>
                      </> : <>
                        <TextField
                          inputProps= {{minLength:0, maxLength: 100}}
                          fullWidth
                          name="password"
                          label="Пароль"
                          type="password"
                          id="password"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Сменить пароль
                        </Button>
                      </>
                    }
                  </> : <>
                    <Typography display="flex" justifyContent="center" variant="h6">Удаление карточки пользователя</Typography>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Удалить
                    </Button>
                  </>}
                  </> : <>
                    <Typography display="flex" justifyContent="center" variant="h6">Заблокировать пользователя?</Typography>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Заблокировать
                    </Button>
                  </> }
                </> : <>
                { <>
                  <Typography display="flex" justifyContent="center" variant="h6">Время начала</Typography>
                  <TextField
                    inputProps= {{minLength:0, maxLength: 100}}
                    fullWidth
                    name="tmstart"
                    type="time"
                    id="tmstart"
                    autoFocus
                  />
                  <Typography display="flex" justifyContent="center" variant="h6">Время конца</Typography>
                  <TextField
                   inputProps= {{minLength:0, maxLength: 100}}
                   fullWidth
                   name="tmend"
                   type="time"
                   id="tmend"
                   autoFocus
                  />
                  <Button
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                  >
                    Смемнить Рабочее время
                  </Button>
                </>}
              </>}
            </Box>
          </Box>
        </Modal>
      </TableCell>
    </TableRow>
  </React.Fragment>
);
}

Row.propTypes = {
row: PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isadmin: PropTypes.string.isRequired,
  blocked: PropTypes.bool.isRequired,
}).isRequired,
};

export default function UsersTable() {
  const [users, setUsers] = useState([]);

    //new fetchdata
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (res.status === 200) {
          let data = await res.json();
          setUsers(data);
        } else {
          console.log("Ошибка получения данных");
        }
      } catch (error) {
        console.log(error);
      }
    };
    return fetchdata();
  }, []);

  //old fetch
  // useEffect(() => {
  //   fetch('/api/admin/users')
  //     .then((response) => response.json())
  //     .then((json) => setUsers(json))
  //     .catch((error) => error)

  //   return;
  // }, []);

return (
  <Box>
    <Typography variant="h6" gutterBottom component="div">Пользователи</Typography>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Сотрудник</TableCell>
            <TableCell>Время начала</TableCell>
            <TableCell>Время конца</TableCell>
            <TableCell>Уровень доступа</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((row) => (
            <Row key={row.id} row={row} 
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);
}
