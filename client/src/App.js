import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import MsgSnackBar from './util/SnackBar';
import Main from './components/Main/Main';
// import Secondary from './components/Main/Secondary';
import SignIn from './components/SignIn/SignIn';
import Account from './components/Account/Account';
import Header from './components/Header/Header';
import StickyFooter from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import Private from './components/Private/Private';
import Document from './components/Private/Document';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useAuth } from './hooks/useAuth';

const theme = createTheme();

function RequireAuth({ children, redirectTo }) {
  const { user } = useAuth();
  return user ? children : <Navigate to={redirectTo} />;
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
                            path="/document/:user_id"
                            element={<Document />}
                          />
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
