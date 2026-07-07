const db = require("../config/db");

async function getTables() {
    const [rows] = await db.query("SHOW TABLES");
    return rows;
}

async function getTableStructure(tableName) {

    const [rows] = await db.query(`SHOW COLUMNS FROM \`${tableName}\``);

    return rows;

}

module.exports = {
    getTables,
    getTableStructure
};