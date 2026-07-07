const db = require("../config/db");


async function insertarMuchos(tabla, registros) {

    if (registros.length === 0) {
        return;
    }


    const columnas = Object.keys(registros[0]);


    const valores = registros.map(registro => {

        return Object.values(registro);

    });


    const placeholders = registros.map(() => {

        return `(${columnas.map(() => "?").join(",")})`;

    }).join(",");


    const sql = `
        INSERT INTO ${tabla}
        (${columnas.join(",")})
        VALUES ${placeholders}
    `;


    const datos = valores.flat();


    const [resultado] = await db.query(sql, datos);


    return resultado;

}


module.exports = {
    insertarMuchos
};