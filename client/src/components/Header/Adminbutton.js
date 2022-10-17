import { Link } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import { useAuth } from "../../hooks/useAuth";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';


export default function AdminButton() {
    const { user } = useAuth();
    const [anchorEll, setAnchorEll] = React.useState(null);
  const openn = Boolean(anchorEll);
  const handleClic = (event) => {
    setAnchorEll(event.currentTarget);
  };
  const handleClos = () => {
    setAnchorEll(null);
  };
    
  return (
  <Box>
      {user.isadmin===1 ?  <Button id="basic-button"
          aria-controls={openn ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openn ? 'true' : undefined}
          onClick={handleClic}
          color="inherit">Admin</Button> : <></> }
          <Menu
            id="basic-menu"
            anchorEl={anchorEll}
            open={openn}
            onClose={handleClos}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem component={Link} to="/admin" onClick={handleClos}>Ежедневный отчет</MenuItem>
            <MenuItem component={Link} to="/journal" onClick={handleClos}>Сводный отчет</MenuItem>
          </Menu>
  </Box>
  );
}