//Funcion poner las las comas cada 3 numeros
export function formatNumber(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
};

//Funcion Para retornar el valor ingresado en moneda
export function formatNumberMoney(number, localeString, currency) {
    return new Intl.NumberFormat(localeString, { style: 'currency', currency: currency }).format(number) //,
};
