function esAutoIncrement(columna){

    return columna.Extra &&
           columna.Extra.includes("auto_increment");

}


function esPrimaryKey(columna){

    return columna.Key === "PRI";

}


function esObligatoria(columna){

    return columna.Null === "NO";

}


function tieneEnum(columna){

    return columna.Type &&
           columna.Type.startsWith("enum");

}


function obtenerValoresEnum(tipo){

    const valores = tipo
        .replace("enum(", "")
        .replace(")", "")
        .replaceAll("'", "")
        .split(",");

    return valores;

}


module.exports = {

    esAutoIncrement,

    esPrimaryKey,

    esObligatoria,

    tieneEnum,

    obtenerValoresEnum

};