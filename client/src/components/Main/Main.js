// import React, { useState, useEffect } from "react";
// import { usePosition } from "use-position";
// import axios from "axios";
import { Typography, Box } from "@mui/material";

// eslint-disable-next-line 
const geolocation = [
  //43.268875~43.268112
  //76.934728~76.935567
  { lat: "43.269", lon: "76.934" },
  { lat: "43.269", lon: "76.934" },
  { lat: "43.268", lon: "76.936" },
  { lat: "43.268", lon: "76.936" },
];

function Main() {
  // const [isVisible, setIsVisible] = useState(true);
  // // const { latitude, longitude } = usePosition();
  // const [ip, setIP] = useState("");

  // const geoMap =  () => {
  //   let lat = "43.26856"; let lon = "76.935";
    
  //   if(lat<=geolocation[0].lat && lat>=geolocation[3].lat){
  //     if(lon>=geolocation[0].lon && lon<=geolocation[3].lon){
  //       return true;
  //     }
  //     else{
  //       return;
  //     }
  //   } else{
  //     return;
  //   }
  // };

  return (
    <Typography component="div" sx={{ marginTop: "45px" }}>
      <Typography component="h1" variant="h4" align="center">
        Это главная страница
      </Typography>

      <Box sx={{ textAlign: "justify", my: 3 }}>
        В данном проекте я пытался разработать программу для учета рабочего
        времени.
      </Box>

      <Box sx={{ textAlign: "justify", my: 3 }}>
        Пока проект находится еще в тестовом виде, могут быть ошибки, но я
        стараюсь сделать максимально удобную и отзывчивую программу.
      </Box>

      <Box sx={{ textAlign: "justify", my: 3 }}>
        Буду рад вашей оценке и помощи при создании данного проекта.
      </Box>

      <Box sx={{ textAlign: "justify", my: 3 }}>
        Для работы над программей войдите в учетную запись или
        зарегестрируйтесь.
      </Box>

      {/* <Box>
        latitude: {latitude}
        <br />
        longitude: {longitude}
        <br />
        {/* IP: {ip}<br/> */}
      {/* </Box> */} 
    </Typography>
  );
}

export default Main;
