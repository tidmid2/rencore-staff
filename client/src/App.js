import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import MsgSnackBar from './util/SnackBar';
import Main from './components/Main/Main';
import SignIn from './components/SignIn/SignIn';
import Account from './components/Account/Account';
import Header from './components/Header/Header';
import StickyFooter from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import Private from './components/Private/Private';
import Document from './components/Private/Document';
import Admin from './components/Admin/Admin';
import Journal from './components/Admin/Journal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Personal from "./components/UserTables/personal";
import { useAuth } from './hooks/useAuth';
import { useAuthMutation } from './services/api';
import { showSnackbar } from './features/ui/uiSlice';
import { setCredentials } from './features/auth/authSlice';
import UsersTable from "./components/UserTables/UsersTable";

const theme = createTheme();

//require auth if yes then stay children else? go nahuy
// function Redirect({ redirectTo }){
//   <Navigate to={redirectTo} />;
// }

function RequireAuth({ children,redirectTo }) {
  const { user } = useAuth();
  return user ? children : <Navigate to={redirectTo} />;
}

function RequireAdmin({ children,redirectTo }) {
  const { user } = useAuth();
  return user.isadmin===1 ? children : <Navigate to={redirectTo} />;
}

function App() {
  const [authed, setAuthed] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [document] = useAuthMutation();
  function hasJWT() {
    let flag = false;
    localStorage.getItem("x-access-token") ? flag=true : flag=false
    return flag;
  }

  async function checkauth(){
      try {
        const user = await document()
        .unwrap();
        dispatch(setCredentials({user}));
        //  navigate('/');
        // navigate('/document');
      } 
      catch (err) {
        console.log(err);
        const errMsg = err?.data?.error?.data || 'Авторизуйтесь пожалуйста.'
        dispatch(showSnackbar({
          message: errMsg,
          severity: 'error'
        }));
    }}
 
    useEffect( () => {
      if (!authed && !hasJWT){
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
                          <Route path="/" element={<Main />} />
                          
                          <Route path="/signin" element={<SignIn />} />
                          <Route path="/signup" element={<SignUp />} />
                          <Route path="/account"
                            element={ <RequireAuth redirectTo="/">
                                        <Account />
                                      </RequireAuth>
                            }/>
                          <Route
                            path="/private"
                            element={ <RequireAuth redirectTo="/">
                                        <Private />
                                      </RequireAuth>
                            }/>
                          <Route
                            path="/document"
                            element={ <RequireAuth redirectTo="/">
                                        <Document />
                                      </RequireAuth>
                            }/>
                          <Route
                          path="/admin"
                          element={ <RequireAuth redirectTo="/">
                                      <RequireAdmin redirectTo="/">
                                        <Admin />
                                      </RequireAdmin>
                                    </RequireAuth>
                          }/>
                          <Route
                          path="/journal"
                          element={ <RequireAuth redirectTo="/">
                                      <RequireAdmin redirectTo="/">
                                        <Journal />
                                      </RequireAdmin>
                                    </RequireAuth>
                          }/>
                          <Route
                          path="/journal/:user/:dt1/:dt2"
                          element={ <RequireAuth redirectTo="/">
                                      <RequireAdmin redirectTo="/">
                                        <Personal />
                                      </RequireAdmin>
                                    </RequireAuth>
                          }/>
                          <Route
                          path="/users"
                          element={ <RequireAuth redirectTo="/">
                                        <UsersTable />
                                    </RequireAuth>
                          }/>
                  </Routes>
                </Container>
                {/* <Secondary/> */}
                <StickyFooter />
            </BrowserRouter>
        </Box>
      </ThemeProvider>

  );
}

export default App;
