const db = require("../config/db");

async function getTables(){

    const [tablas] = await db.query(
        "SHOW TABLES"
    );


    return tablas.map(tabla => {

        return Object.values(tabla)[0];

    });

}

async function getTableStructure(tableName) {

    const [rows] = await db.query(`SHOW COLUMNS FROM \`${tableName}\``);

    return rows;

}

module.exports = {
    getTables,
    getTableStructure
};