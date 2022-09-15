import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Main() {

    return (
    <Typography component="div" sx={{ marginTop: "45px" }}>
    
      <Typography component="h1" variant="h4" align="center">
        Это главная страница
      </Typography>
      <Box sx={{ textAlign: 'justify', my: 3 }}>
        ТУТ магазин
      </Box>

      <Box sx={{ textAlign: 'justify', my: 3 }}>
        ТУТ еще посмотрим
      </Box>
      
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Link href="/api/docs" rel="noopener" target="_blank">http://localhost:3001/api/docs</Link>
      </Box>

      <Box sx={{ textAlign: 'justify', my: 3 }}>
      Интерфейс использует React, React-router v6 и mui (Material UI) v5. Поле «подтвердить пароль» отсутствует, так как реализация зависит от того, какое решение формы используется (управляемые компоненты или библиотека, такая как formik, react-hook-form). Он обеспечивает вход/выход из серверной части и сохраняет пользователя в срезе аутентификации Redux. Запрос RTK (запрос Redux-Toolkit) используется для упрощения получения состояния, связанного с API. Файл cookie сеанса httpOnly, используемый экспресс-сеансом, можно найти в Chrome Dev-tools/Application/Cookies и он называется connect.sid. Выход из системы очищает файл cookie сеанса и хранилище Redux. Цените любые сообщения об ошибках или вклады.
      </Box>


    </Typography>
  );
 }

export default Main;