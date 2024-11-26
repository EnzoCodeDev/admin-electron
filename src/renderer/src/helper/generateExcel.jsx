import * as XLSX from "xlsx";

const createExcel = (s) => {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
};
//Esto es una funtion para difinir el grandor de la columna de forma automatica
function fitToColumn(arrayOfArray) {
    // get maximum character of each column
    return arrayOfArray[0].map((a, i) => ({
        wch: Math.max(...arrayOfArray.map((a2) => a2[i].toString().length)) + 1,
    }));
}

export function generarEXCELDATA(
    name = "MM",
    cortName = "MM",
    colums = [],
    rows = []
) {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = fitToColumn(colums);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, cortName);
    XLSX.utils.sheet_add_aoa(worksheet, colums, {
        origin: "A1"
    });
    var wbout = XLSX.write(workbook, {
        bookType: "xlsx",
        bookSST: true,
        type: "binary",
    });
    const url = window.URL.createObjectURL(new Blob([createExcel(wbout)]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}${".xlsx"}`);
    document.body.appendChild(link);
    link.click();
}