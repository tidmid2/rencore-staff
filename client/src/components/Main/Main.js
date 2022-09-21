import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';

function Main() {

    return (
    <Typography component="div" sx={{ marginTop: "45px" }}>
    
      <Typography component="h1" variant="h4" align="center">
        Это главная страница
      </Typography>
      <Box sx={{ textAlign: 'justify', my: 3 }}>
        В данном проекте я пытался разработать программу для учета рабочего времени.
      </Box>

      <Box sx={{ textAlign: 'justify', my: 3 }}>
        Пока проект находится еще в тестовом виде, могут быть ошибки, но я стараюсь сделать максимально удобную и отзывчивую программу.
      </Box>
      
      {/* <Box sx={{ textAlign: 'center', my: 3 }}>
        <Link href="/api/docs" rel="noopener" target="_blank">http://localhost:3001/api/docs</Link>
      </Box> */}

      <Box sx={{ textAlign: 'justify', my: 3 }}>
      Буду рад вашей оценке и помощи при создании данного проекта.
      </Box>

      <Box sx={{ textAlign: 'justify', my: 3 }}>
      Для работы над программей войдите в учетную запись или зарегестрируйтесь.
      </Box>


    </Typography>
  );
 }

export default Main;