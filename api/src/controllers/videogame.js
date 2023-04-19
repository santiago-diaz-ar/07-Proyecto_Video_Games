const axios = require("axios");
const { Videogame, Genre } = require("../db");

const base_Url =
  "https://api.rawg.io/api/games?key=bb66399c2b3b43f1b33263d6135fa4ba";

const get_Videogames_api = async () => {
  try {
    let url = base_Url;
    let pagina = 0;
    let prueba = [];
    while (url && pagina < 1) {
      const api = await axios.get(url);
      if (api.status === 200) {
        prueba.push(
          api.data.results?.map((g) => {
            return {
              image: g?.background_image,
              name: g?.name,
              genre: g?.genres?.map((e) =>
                e?.name === "" || e?.name === undefined || e?.name === null
                  ? (e.name = "vacio")
                  : e.name
              ),
            };
          })
        );
        url = api.data.next;
        pagina++;
      } else {
        console.log("error con el llamado al servidor:", response.status);
        break;
      }
    }
    return prueba;
  } catch (error) {
    return error;
  }
};

const get_Videogames_db = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
    },
  });
};

const get_api_db = async () => {
  const api = await get_Videogames_api();
  const db = await get_Videogames_db();
  const api_db = [...api, ...db];
  return api_db;
};

module.exports = {
  get_Videogames_api,
  get_Videogames_db,
  get_api_db,
};
