const { Router } = require("express");
const { Videogame } = require("../db");
const { get_api_db } = require("../controllers/videogame");
const { default: axios } = require("axios");

const rootRouter = Router();

rootRouter.get("/", async (req, res) => {
  const { name } = req.query;
  const games = await get_api_db();
  try {
    if (games) res.status(200).send(games);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

rootRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=bb66399c2b3b43f1b33263d6135fa4ba`
    );
    const total = {
      name: detalle?.data.name,
      image: detalle?.data.background_image,
      genre: detalle?.data.genres.map((g) => g.name),
      description: detalle?.data.description_raw,
      released: detalle?.data.released,
      rating: detalle?.data.rating,
      platforms: detalle?.data.platforms.map((p) => p.platform.name),
    };
    res.status(200).send(total);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

rootRouter.post("/", async (req, res) => {
  try {
    const { 
      name,
      description,
      fecha_de_lanzamiento,
      rating,
      plataformas,
     } =
      req.body;

    const game = await Videogame.create({
      name,
      description,
      fecha_de_lanzamiento,
      rating,
      plataformas
    })
    //
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = rootRouter;
