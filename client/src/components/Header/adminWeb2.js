import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Box from '@mui/material/Box';
export default function AdminWeb2() {
    const { user } = useAuth();
  return (user.isAdmin===1 ? <Box component={Link} to="/journal" color="inherit" sx={{textDecoration: "none"}}>Сводный отчет</Box> : <></>);
}