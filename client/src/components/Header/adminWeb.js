import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
export default function AdminWeb() {
    const { user } = useAuth();
  return (user.isadmin===1 ? 
  <Grid 
    container
    direction="column"
    justifyContent="center"
    alignItems="flex-start"
    spacing={3}
  >
    <Grid item><Box component={Link} to="/admin" color="inherit" sx={{textDecoration: "none"}}>Ежедневный отчет</Box></Grid>
    <Grid item><Box component={Link} to="/journal" color="inherit" sx={{textDecoration: "none"}}>Сводный отчет</Box></Grid>
    <Grid item><Box component={Link} to="/users" color="inherit" sx={{textDecoration: "none"}}>Пользователи</Box></Grid>
  </Grid> : <></>);
}