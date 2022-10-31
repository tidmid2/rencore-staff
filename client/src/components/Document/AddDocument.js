import { useDispatch } from 'react-redux';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Box, Container, TextField, Modal } from '@mui/material';

import { showSnackbar } from '../../features/ui/uiSlice';
import { useDocumentMutation } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [open, setOpen] = React.useState(false);

  const [document] = useDocumentMutation();
  const { user } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const id = await document({
        user_id: user.id,
        comment: data.get("comment")
      }).unwrap();
      dispatch(showSnackbar({
        message: 'Вы успешно отметились',
        severity: 'success'
      }));
       navigate('/');
       navigate('/document');
       return id;
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              inputProps= {{minLength:0, maxLength: 100}}
              fullWidth
              name="comment"
              label="Комментарии"
              id="comment"
              autoFocus
            />
            
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