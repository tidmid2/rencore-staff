import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { DataGrid } from "@mui/x-data-grid";
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {  selectDocumentById } from '.../features/ui/documentSlice'
// import { useHistory, useParams } from 'react-router-dom'

// const [data, setData] = useState([])
// const [perPage] = useState(6)
// const [pageCount, setPageCount] = useState(0)
// const { productOffset = 0 }= useParams()
// let history = useHistory()
// const dispatch = useDispatch()

const columns = [
  {
    field: "Date",
    headerName: "Date",
    width: 150,
    editable: false
  },
  {
    field: "Time",
    headerName: "Time",
    width: 150,
    editable: false
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 300,
    editable: false
  },
  {
    field: "status",
    headerName: "status",
    width: 150,
    editable: false
  }
];

const rows = [
  { id: 1, Date: "08:59:52", Time: "2022.09.07", comment: " ", status: 0 },
  { id: 2, Date: "08:59:52", Time: "2022.09.06", comment: " ", status: 1 },
  { id: 3, Date: "08:59:52", Time: "2022.09.05", comment: " ", status: 1 },
  { id: 4, Date: "08:59:52", Time: "2022.09.04", comment: " ", status: 1 },
  { id: 5, Date: "08:59:52", Time: "2022.09.03", comment: " ", status: 0 },
  { id: 6, Date: "08:59:52", Time: "2022.09.02", comment: " ", status: 1 },
  { id: 7, Date: "08:59:52", Time: "2022.09.01", comment: " ", status: 1 },
  { id: 8, Date: "08:59:52", Time: "2022.08.31", comment: " ", status: 1 },
  { id: 9, Date: "08:59:52", Time: "2022.08.30", comment: " ", status: 0 }
];

// useEffect(() => {
//   dispatch(needsCheckoutRedirectUpdated(false))
// }, [dispatch])

// useEffect(() => {
//   const slice = Object.keys(document).slice(productOffset, productOffset + perPage)
//   const postData = slice.map(keyName =>
//           <ProductCard
//             key={document[keyName].id}
//             document={document[keyName]} />)
//   setData(postData)
//   setPageCount(Math.ceil(Object.keys(document).length / perPage))
// }, [products, productOffset, perPage])

// const handlePageClick = (e) => {
//   const selectedPage = e.selected
//   window.scrollTo(0, 0);
//   history.push(`/${Math.ceil(selectedPage * perPage)}`)
// }




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

      <Box sx={{ height: 600, width: "100%"  }}>
        <DataGrid experimentalFeatures={{ newEditingApi: true }} rows={rows} columns={columns} /> 
      </Box>
      

    </Typography>
  );
 }

export default Main;