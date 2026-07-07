const schemaService = require("./schema.service");
const fakerService = require("./faker.service");
const relationsService = require("./relations.service");
const relationDataService = require("./relation-data.service");



async function generarRegistros(tabla, cantidad) {


    const columnas = await schemaService.getTableStructure(tabla);


    const relaciones = await relationsService.getForeignKeys(tabla);



    const registros = [];



    for(let i = 0; i < cantidad; i++){


        const registro = {};



        for(const columna of columnas){


            let valor;



            // Buscar si la columna tiene llave foránea

            const relacion = relaciones.find(
                r => r.COLUMN_NAME === columna.Field
            );



            if(relacion){


                const valores = await relationDataService.obtenerValores(
                    relacion.REFERENCED_TABLE_NAME,
                    relacion.REFERENCED_COLUMN_NAME
                );


                if(valores.length > 0){

                    valor = valores[
                        Math.floor(Math.random() * valores.length)
                    ];

                }


            }else{


                valor = fakerService.generarValor(columna);


            }



            if(valor !== null && valor !== undefined){

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