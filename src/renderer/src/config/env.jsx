//Manejo de variables de entorno para toda la aplicación
let envDeveloment = {
    mode: 'development',
    url: import.meta.env.VITE_REACT_APP_URL_DEVELOPMENT,
};

let envProduction = {
    mode: 'production',
    url: import.meta.env.VITE_REACT_APP_URL_PRODUCTION,
};

export default (import.meta.env.MODE === 'development') ? envDeveloment : envProduction;