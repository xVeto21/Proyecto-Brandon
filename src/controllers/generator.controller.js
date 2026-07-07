const schemaService = require("../services/schema.service");
const fakerService = require("../services/faker.service");
const insertService = require("../services/insert.service");
const generatorService = require("../services/generator.service");
const relationsService = require("../services/relations.service");



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


        const columnas = await schemaService.getTableStructure(tabla);

        const registro = {};


        for (const columna of columnas) {

            const valor = fakerService.generarValor(columna);


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




async function generarEInsertar(req, res) {

    try {

        const inicio = Date.now();


        const { tabla } = req.params;

        const { cantidad } = req.body;



        if(
    !cantidad ||
    typeof cantidad !== "number" ||
    cantidad <= 0
){

    return res.status(400).json({

        mensaje:"La cantidad debe ser un número mayor que 0"

    });

}



        const registros = await generatorService.generarRegistros(
            tabla,
            cantidad
        );



        const resultado = await insertService.insertarMuchos(
            tabla,
            registros
        );



        const tiempo = Date.now() - inicio;



        res.json({

            mensaje: "Proceso completado correctamente",

            tabla,

            solicitados: cantidad,

            insertados: resultado.affectedRows,

            errores: 0,

            tiempo: `${tiempo} ms`

        });



    } catch (error) {


        res.status(500).json({

            mensaje: "Error generando registros",

            error: error.message

        });


    }

}




async function vistaPrevia(req, res) {


    try {


        const { tabla } = req.params;

        const { cantidad } = req.body;



        if(
    !cantidad ||
    typeof cantidad !== "number" ||
    cantidad <= 0
){

    return res.status(400).json({

        mensaje:"La cantidad debe ser un número mayor que 0"

    });

}



        const registros = await generatorService.generarRegistros(
            tabla,
            cantidad
        );



        res.json({

            total: registros.length,

            registros

        });



    } catch (error) {


        res.status(500).json({

            mensaje: "Error generando vista previa",

            error: error.message

        });


    }

}
async function obtenerRelaciones(req,res){

    try{

        const { tabla } = req.params;


        const relaciones =
            await relationsService.getForeignKeys(tabla);


        res.json(relaciones);


    }catch(error){

        res.status(500).json({

            mensaje:error.message

        });

    }

}




module.exports = {

    obtenerTablas,

    obtenerEstructura,

    generarRegistro,

    generarEInsertar,

    vistaPrevia,
    
    obtenerRelaciones

};