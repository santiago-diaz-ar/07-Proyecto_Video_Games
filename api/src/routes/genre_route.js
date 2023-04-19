const { Router } = require("express");
const axios = require("axios");
const { genreController } = require("../controllers/genre");

const { Genre } = require("../db");

const rootRouter = Router();

rootRouter.get("/", async (req, res) => {
  try {
    const prueba = await genreController();

    const arrSinDuplicados = prueba?.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });

    arrSinDuplicados?.forEach((g) => {
      Genre.findOrCreate({
        where: { name: g },
      });
    });

    const genres_Base_de_datos = await Genre.findAll();

    res.status(200).send(genres_Base_de_datos);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = rootRouter;
