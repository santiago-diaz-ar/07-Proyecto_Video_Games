const { Router } = require("express");
const morgan = require("morgan");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogame = require("./videogames_route");
const genres = require("./genre_route");

const router = Router();

router.use(morgan("dev"));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogame);
router.use("/genres", genres);

module.exports = router;
