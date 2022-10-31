import { Typography, Box, Container } from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    status:{
        fontWeight: 'bold',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 10,
    margin: '20px 0 20px',
    padding: '3px 10px',
    display: 'inline-block'
    }
  }));

export default function Clear() {
  const classes = useStyles();

  return (
    <Container align="center" >
      <Box>
        <Typography  className={classes.status}  >
            К сожалению пусто
        </Typography>
      </Box>
    </Container>
  );
}