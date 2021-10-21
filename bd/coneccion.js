const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    port: 5432,
    database: "repertorio",
});
// Paso 2
const getDate = async () => {
    const result = await pool.query("SELECT NOW()");
    return result;
};
// Paso 3

const insertar = async (datos) => {

    datos.unshift(uuidv4().slice(30));
    console.log(datos);

    const consulta = {
        text: "INSERT INTO repertorio values($1, $2, $3, $4)",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        // Paso 4
        console.log(error.code);
        return error;
    }
};
// Paso 5


const consultar = async () => {
    // Paso 2
    try {
        const result = await pool.query("SELECT * FROM repertorio");
        return result;
    } catch (error) {
        // Paso 3
        console.log(error.code);
        return error;
    }
};



const editar = async (datos) => {
    console.log(datos);
    // Paso 2
    const consulta = {
        text: `UPDATE repertorio SET
            cancion = $2,
            artista = $3,
            tono = $4
            WHERE id = $1 RETURNING *`,
        values: datos,
    };
    // Paso 3
    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};


const eliminar = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}'`);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }

};






module.exports = { getDate, insertar, consultar, editar, eliminar };
