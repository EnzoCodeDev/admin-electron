import 'animate.css';
import axios from 'axios';
import { ConfigProvider, theme } from 'antd';
import { Router } from './routers/Router';
import env from './config/env';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import configStore from './store/configStore';

dayjs.locale('es')

function App() {
  //Configuracion para poner por defecto las petciones axios
  const configTienda = configStore((state) => state);
  axios.defaults.baseURL = env['url'];
  axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  return (
    <ConfigProvider
      theme={{ algorithm: (configTienda["theme"] === 'ligth' ? theme.compactAlgorithm : theme.darkAlgorithm) }}
    >
      <Router />
    </ConfigProvider>
  )
}

export default App

