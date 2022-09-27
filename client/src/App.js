import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
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

const theme = createTheme();

function RequireAuth({ children, redirectTo }) {
  const { user } = useAuth();
  return user ? children : <Navigate to={redirectTo} />;
}

function RequireAdmin({ children, redirectTo }) {
  const { user } = useAuth();
  return user.isAdmin===1 ? children : <Navigate to={redirectTo} />;
}

function App() {

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
                            element={ <RequireAuth redirectTo="/signin">
                                        <Account />
                                      </RequireAuth>
                            }/>
                          <Route
                            path="/private"
                            element={ <RequireAuth redirectTo="/signin">
                                        <Private />
                                      </RequireAuth>
                            }/>
                          <Route
                            path="/document"
                            element={ <RequireAuth redirectTo="/signin">
                                        <Document />
                                      </RequireAuth>
                            }/>
                          <Route
                          path="/admin"
                          element={ <RequireAuth redirectTo="/signin">
                                      <RequireAdmin redirectTo="/">
                                        <Admin />
                                      </RequireAdmin>
                                    </RequireAuth>
                          }/>
                          <Route
                          path="/journal"
                          element={ <RequireAuth redirectTo="/signin">
                                      <RequireAdmin redirectTo="/">
                                        <Journal />
                                      </RequireAdmin>
                                    </RequireAuth>
                          }/>
                          <Route
                          path="/journal/:user/:dt1/:dt2"
                          element={ <RequireAuth redirectTo="/signin">
                                      <RequireAdmin redirectTo="/">
                                        <Personal />
                                      </RequireAdmin>
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
