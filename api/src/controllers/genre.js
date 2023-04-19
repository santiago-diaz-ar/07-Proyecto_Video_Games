const axios = require("axios");

const genreController = async () => {
  const base_url =
    "https://api.rawg.io/api/games?key=bb66399c2b3b43f1b33263d6135fa4ba";
  try {
    let pagina = 0;
    let results = [];
    let url = base_url;
    while (url && pagina < 6) {
      const api = await axios.get(url);
      if (api.status === 200) {
        api?.data?.results?.map((e) =>
          e?.genres?.map((e) => {
            results.push(e?.name?.toLowerCase());
          })
        );
      }
      url = api.data.next;
      pagina++;
    }
    return results;
  } catch (error) {
    return error.message;
  }
};

module.exports = { genreController };
