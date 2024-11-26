import 'animate.css';
import axios from 'axios';
import { ConfigProvider, theme } from 'antd';
import { Router } from './routers/Router';
import env from './config/env';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

dayjs.locale('es')

function App() {
  //Configuracion para poner por defecto las petciones axios
  axios.defaults.baseURL = env['url'];
  axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  return (
    // <ConfigProvider
    //   theme={{ algorithm: theme.compactAlgorithm }}
    // >
      <Router />
    // </ConfigProvider>
  )
}

export default App

