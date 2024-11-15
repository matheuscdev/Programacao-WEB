const animeController = require("../controller/animes_controller");
const {Router} = require("express");

const animeRouter = Router();

animeRouter.post("/animes", animeController.addAnime);
animeRouter.patch("/animes/:id", animeController.updateAnime);
animeRouter.delete("/animes/:id", animeController.deleteAnime);
animeRouter.get("/animes", animeController.getallAnimes);
animeRouter.get("/animes/:id", animeController.getById);



module.exports = animeRouter;