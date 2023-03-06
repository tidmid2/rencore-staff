import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { showSnackbar } from "../../features/ui/uiSlice";
import { useUpdatePassMutation } from "../../services/api";

export default function ResetPass({ showAlert }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, token } = useParams();

  const [reset] = useUpdatePassMutation();
  // eslint-disable-next-line
  const [iduser, setIduser] = useState(id);
  // eslint-disable-next-line
  const [idtoken, setIdoken] = useState(token);
  const [tokenstatus, setTokenstatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      // setIsLoading(true);
      // eslint-disable-next-line
      const idd = await reset({
        password: data.get("password"),
        id: iduser,
        token: idtoken,
      }).unwrap();
      dispatch(
        showSnackbar({
          message: "Пароль успешно обновлён",
          severity: "success",
        })
      );
      // setIsLoading(false)
      navigate("/");
    } catch (err) {
      console.log(err);
      const errMsg =
        err?.data?.error?.data || "Произошла ошибка при обновлении пароля.";
      dispatch(
        showSnackbar({
          message: errMsg,
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/auth/reset-password/${id}/${token}`
        );
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        setTokenstatus(result.status);
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
      }
    };
    return fetchData();
  }, [id, token]);

  if (tokenstatus !== true) {
    return !isLoading ? (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
      </Container>
    ) : (
      <CircularProgress/>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h4">
            Введите новый пароль
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  inputProps={{ minLength: 6, maxLength: 100 }}
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
}
