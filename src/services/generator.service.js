const schemaService = require("./schema.service");
const fakerService = require("./faker.service");


async function generarRegistros(tabla, cantidad) {

    const columnas = await schemaService.getTableStructure(tabla);

    const registros = [];


    for(let i = 0; i < cantidad; i++){

        const registro = {};


        for(const columna of columnas){

            const valor = fakerService.generarValor(columna);


            if(valor !== null){

                registro[columna.Field] = valor;

            }

        }


        registros.push(registro);

    }


    return registros;

}


module.exports = {
    generarRegistros
};