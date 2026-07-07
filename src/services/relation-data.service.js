const db = require("../config/db");


async function obtenerValores(tabla, columna){

    const [resultados] = await db.query(
        `SELECT ${columna} FROM ${tabla}`
    );


    return resultados.map(registro => registro[columna]);

}



module.exports = {

    obtenerValores

};