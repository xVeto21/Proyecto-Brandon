const db = require("../config/db");


async function getForeignKeys(tabla){

    const sql = `

    SELECT
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME

    FROM information_schema.KEY_COLUMN_USAGE

    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = ?
    AND REFERENCED_TABLE_NAME IS NOT NULL

    `;


    const [relaciones] = await db.query(
        sql,
        [tabla]
    );


    return relaciones;

}



module.exports = {

    getForeignKeys

};