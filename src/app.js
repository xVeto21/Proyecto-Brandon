require("dotenv").config();

const generatorRoutes = require("./routes/generator.routes");
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", generatorRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

async function conectarDB() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Conectado a MySQL");
        connection.release();
    } catch (error) {
        console.error("❌ Error al conectar a MySQL");
        console.error(error.message);
    }
}

conectarDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);
});