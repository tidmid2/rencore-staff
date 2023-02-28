import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Box, Container, TextField, Modal } from "@mui/material";

import { showSnackbar } from "../../features/ui/uiSlice";
import { useDocumentMutation } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddDocument({ showAlert }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [getIP, setGetIP] = useState();
  const [document] = useDocumentMutation();
  const { user } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://httpbin.org/ip");
      if (res.status === 200) {
        let data = res.data;
        setGetIP(data.origin);
      } else {
        console.log("Ошибка получения данных");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    return;
  }, [getIP]);

  const handleSubmit = async (e) => {
    setClicked(true);
    if (clicked) {
      return navigate("/document");
    } else {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      try {
        const id = await document({
          user_id: user.id,
          comment: data.get("comment"),
          ip: getIP,
        }).unwrap();
        dispatch(
          showSnackbar({
            message: "Вы успешно отметились",
            severity: "success",
          })
        );
        navigate("/");
        navigate("/document");
        // return id;
        setClicked(false);
      } catch (err) {
        console.log(err);
        const errMsg =
          err?.data?.error?.data || "Произошла ошибка при отметке.";
        dispatch(
          showSnackbar({
            message: errMsg,
            severity: "error",
          })
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Button
        onClick={handleOpen}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
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
              inputProps={{ minLength: 0, maxLength: 100 }}
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
