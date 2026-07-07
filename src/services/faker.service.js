const { faker } = require("@faker-js/faker");
const rulesService = require("./rules.service");


// Configurar Faker en español
faker.locale = "es";


function generarValor(columna) {

    const nombre = columna.Field.toLowerCase();
    const tipo = columna.Type.toLowerCase();


    // No generar valores para AUTO_INCREMENT
    if (rulesService.esAutoIncrement(columna)) {
        return null;
    }


    // Si la columna es ENUM solamente usar valores permitidos
    if (rulesService.tieneEnum(columna)) {

        const valores = rulesService.obtenerValoresEnum(tipo);

        return faker.helpers.arrayElement(valores);

    }


    // Si la columna permite NULL puede dejarse vacío algunas veces

    // ======== DATOS SEGÚN EL NOMBRE DE LA COLUMNA ========


    if (nombre.includes("nombre")) {

        return faker.person.firstName();

    }


    if (nombre.includes("apellido")) {

        return faker.person.lastName();

    }


    if (nombre.includes("correo") || nombre.includes("email")) {

        return faker.internet.email();

    }


    if (nombre.includes("telefono")) {

        return faker.string.numeric(10);

    }


    if (nombre.includes("direccion")) {

        return faker.location.streetAddress();

    }


    if (nombre.includes("ciudad")) {

        return faker.location.city();

    }


    if (nombre.includes("pais")) {

        return faker.location.country();

    }


    if (nombre.includes("empresa")) {

        return faker.company.name();

    }


    if (nombre.includes("precio")) {

        return faker.commerce.price({
            min: 10,
            max: 5000
        });

    }



    // ======== DATOS SEGÚN EL TIPO ========


    if (tipo.startsWith("int")) {

        return faker.number.int({
            min: 1,
            max: 100
        });

    }


    if (tipo.startsWith("decimal")) {

        return faker.number.float({
            min: 10,
            max: 5000,
            fractionDigits: 2
        });

    }


    if (tipo.startsWith("varchar")) {

        const resultado = tipo.match(/\d+/);

        const limite = resultado
            ? parseInt(resultado[0])
            : 20;


        return faker.string.alpha({
            length: limite,
            casing: "mixed"
        });

    }


    if (tipo.startsWith("text")) {

        return faker.lorem.sentence();

    }


    if (tipo.startsWith("date")) {

        return faker.date.past();

    }


    if (tipo.startsWith("datetime")) {

        return faker.date.recent();

    }


    if (tipo.startsWith("timestamp")) {

        return faker.date.recent();

    }


    if (tipo.startsWith("boolean") || tipo.startsWith("tinyint(1)")) {

        return faker.datatype.boolean();

    }


    return null;

}


module.exports = {

    generarValor

}; 