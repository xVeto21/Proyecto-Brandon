const schemaService = require("../services/schema.service");
const fakerService = require("../services/faker.service");
const insertService = require("../services/insert.service");


async function obtenerTablas(req, res) {

    try {

        const tablas = await schemaService.getTables();

        res.status(200).json(tablas);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error obteniendo tablas",
            error: error.message
        });

    }

}
async function obtenerEstructura(req, res) {

    try {

        const { tabla } = req.params;

        const estructura = await schemaService.getTableStructure(tabla);

        res.json(estructura);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

}
async function generarRegistro(req, res) {

    try {

        const { tabla } = req.params;

        // Obtener la estructura de la tabla
        const columnas = await schemaService.getTableStructure(tabla);

        const registro = {};

        for (const columna of columnas) {

            const valor = fakerService.generarValor(columna);

            // No agregar columnas AUTO_INCREMENT
            if (valor !== null) {
                registro[columna.Field] = valor;
            }

        }

        res.json(registro);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

}

async function generarEInsertar(req,res){

    try{

        const { tabla } = req.params;

        const { cantidad } = req.body;


        if(!cantidad){

            return res.status(400).json({
                mensaje:"Debe indicar la cantidad de registros"
            });

        }


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


        const resultado = await insertService.insertarMuchos(
            tabla,
            registros
        );


        res.json({

            mensaje:"Registros insertados correctamente",

            insertados: resultado.affectedRows

        });



    }catch(error){

        res.status(500).json({

            mensaje:"Error generando registros",

            error:error.message

        });

    }

}
module.exports = {
    obtenerTablas,
    obtenerEstructura,
    generarRegistro,
    generarEInsertar
};