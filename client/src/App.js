import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material/';

import Personal from "./components/Journal/Personal";
import Users from "./components/Users/Users";
import ResetPassword from "./components/ResetPass/ResetPassLink";
import ResetPass from "./components/ResetPass/ResetPassword";
import Main from './components/Main/Main';
import SignIn from './components/SignIn/SignIn';
import Account from './components/Account/Account';
import Header from './components/Header/Header';
import StickyFooter from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import Document from './components/Document/Document';
import Admin from './components/Admin/Admin';
import Journal from './components/Journal/Journal';
import MsgSnackBar from './util/SnackBar';

import { useAuth } from './hooks/useAuth';
import { useAuthMutation } from './services/api';
import { showSnackbar } from './features/ui/uiSlice';
import { setCredentials } from './features/auth/authSlice';

const theme = createTheme();

function RequireAuth({ children,redirectTo }) {
  const { user } = useAuth();
  return user ? children : <Navigate to={redirectTo} />;
}

function RequireAdmin({ children,redirectTo }){
  const { user } = useAuth();
  return user.isadmin===1 ? children : <Navigate to={redirectTo} />;
}

function hasJWT() {
  let flag = false;
  localStorage.getItem("x-access-token") ? flag=true : flag=false
  return flag;
}

function App() {
  const dispatch = useDispatch();

  const [authed, setAuthed] = useState(false);

  const [document] = useAuthMutation();

  

  async function checkauth(){
      try {
        const user = await document()
        .unwrap();
        dispatch(setCredentials({user}));
      } 
      catch (err) {
        console.log(err);
        const errMsg = err?.data?.error?.data || 'Произошло ошибка при авторизации.'
        dispatch(showSnackbar({
          message: errMsg,
          severity: 'error'
        }));
    }}
    
    
    useEffect( () => {
      hasJWT();
      if (!authed && !hasJWT()){
        return;
      }
      else{
        setAuthed(true);
        checkauth();
        
      };
    },[]);
    


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <MsgSnackBar />
        <BrowserRouter>
          <Header />
          <Container component="main" sx={{ mt: 8, mb: 2}} maxWidth="lg">
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/signin" element={<SignIn/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/resetpassword" element={<ResetPassword/>} />
              <Route path="/resetpassword/:id/:token" element={<ResetPass/>}/>
              
              <Route path="/account"
                element={ 
                  <RequireAuth redirectTo="/">
                    <Account/>
                  </RequireAuth>
                }/>
              <Route
                path="/document"
                element={ 
                  <RequireAuth redirectTo="/">
                    <Document/>
                  </RequireAuth>
                }/>
              <Route
              path="/admin"
              element={ 
                <RequireAuth redirectTo="/">
                  <RequireAdmin redirectTo="/">
                    <Admin/>
                  </RequireAdmin>
                </RequireAuth>
              }/>
              <Route
              path="/journal"
              element={ 
                <RequireAuth redirectTo="/">
                  <RequireAdmin redirectTo="/">
                    <Journal/>
                  </RequireAdmin>
                </RequireAuth>
              }/>
              <Route
              path="/journal/:user/:dt1/:dt2"
              element={ 
                <RequireAuth redirectTo="/">
                  <RequireAdmin redirectTo="/">
                    <Personal/>
                  </RequireAdmin>
                </RequireAuth>
              }/>
              <Route
              path="/users"
              element={ 
                <RequireAuth redirectTo="/">
                  <RequireAdmin redirectTo="/">
                    <Users/>
                  </RequireAdmin>
                </RequireAuth>
              }/>
            </Routes>
          </Container>
          <StickyFooter />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
