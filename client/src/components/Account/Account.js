import { Typography, Box } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';

function Account() {
  const { user } = useAuth();
  
  return (
    <Typography component="div" sx={{ marginTop: "45px" }}>
      <Typography component="h1" variant="h4" align="center">
        Профиль
      </Typography>

      { user &&
        <>
          <Box sx={{ textAlign: 'center', m: 1 }}>Имя: {user.first_name} {user.last_name}</Box>
          <Box sx={{ textAlign: 'center', m: 1 }}>Почта: {user.email}</Box>
          <Box sx={{ textAlign: 'center', m: 1 }}>ID: {user.id}</Box>
        </>
      }
    </Typography>
  );
}

export default Account;