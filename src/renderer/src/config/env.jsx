//Manejo de variables de entorno para toda la aplicación
let envDeveloment = {
    mode: 'development',
    url: "http://127.0.0.1:8000/api/"
};

let envProduction = {
    mode: 'production',
    url: "http://127.0.0.1:8000/api/"
};

export default (import.meta.env.MODE === 'development') ? envDeveloment : envProduction;