const express = require("express");

const router = express.Router();

const generatorController = require("../controllers/generator.controller");

router.get("/generate/:tabla", generatorController.generarRegistro);
router.get("/tables", generatorController.obtenerTablas);
router.get("/tables/:tabla", generatorController.obtenerEstructura);
router.post("/generate/:tabla", generatorController.generarEInsertar);
router.post("/preview/:tabla", generatorController.vistaPrevia);

module.exports = router;