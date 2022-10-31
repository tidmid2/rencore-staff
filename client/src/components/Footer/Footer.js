import { Box, Typography, Container, Link } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://connect.bestprofi.com/">
        tidmid2
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm" align="center">
        <Typography variant="body1">
          Разработано силами усилия и терпения
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}