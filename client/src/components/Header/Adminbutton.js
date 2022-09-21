import { Link } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import { useAuth } from "../../hooks/useAuth";


export default function AdminButton() {
    const { user } = useAuth();
    
  return user.isAdmin===1 ?  <Button component={Link} to="/admin" color="inherit">Admin</Button> : <></> 
}