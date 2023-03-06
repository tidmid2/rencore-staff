import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material/";

import Personal from "./components/Journal/Personal";
import Users from "./components/Users/Users";
import ResetPassword from "./components/ResetPass/ResetPassLink";
import ResetPass from "./components/ResetPass/ResetPassword";
import Main from "./components/Main/Main";
import SignIn from "./components/SignIn/SignIn";
import Account from "./components/Account/Account";
import Header from "./components/Header/Header";
import StickyFooter from "./components/Footer/Footer";
import SignUp from "./components/SignUp/SignUp";
import Document from "./components/Document/Document";
import Admin from "./components/Admin/Admin";
import Journal from "./components/Journal/Journal";
import MsgSnackBar from "./util/SnackBar";

import { useAuth } from "./hooks/useAuth";

const theme = createTheme();

function RequireAuth({ children, redirectTo }) {
  const { user } = useAuth();
  return user != null ? children : <Navigate to={redirectTo} />;
}

function RequireAdmin({ children, redirectTo }) {
  const { user } = useAuth();
  return user.isadmin === 1 ? children : <Navigate to={redirectTo} />;
}


function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <MsgSnackBar />
        <BrowserRouter>
          <Header />
          <Container component="main" sx={{ mt: 15, mb: 2 }} maxWidth="lg">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/resetpassword/:id/:token" element={<ResetPass />} />

              <Route
                path="/account"
                element={
                  <RequireAuth redirectTo="/signin">
                    <Account />
                  </RequireAuth>
                }
              />
              <Route
                path="/document"
                element={
                  <RequireAuth redirectTo="/signin">
                    <Document />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAuth redirectTo="/signin">
                    <RequireAdmin redirectTo="/">
                      <Admin />
                    </RequireAdmin>
                  </RequireAuth>
                }
              />
              <Route
                path="/journal"
                element={
                  <RequireAuth redirectTo="/signin">
                    <RequireAdmin redirectTo="/">
                      <Journal />
                    </RequireAdmin>
                  </RequireAuth>
                }
              />
              <Route
                path="/journal/:user/:dt1/:dt2"
                element={
                  <RequireAuth redirectTo="/signin">
                    <RequireAdmin redirectTo="/">
                      <Personal />
                    </RequireAdmin>
                  </RequireAuth>
                }
              />
              <Route
                path="/users"
                element={
                  <RequireAuth redirectTo="/signin">
                    <RequireAdmin redirectTo="/">
                      <Users />
                    </RequireAdmin>
                  </RequireAuth>
                }
              />
            </Routes>
          </Container>
          <StickyFooter />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
