const express = require('express');
const albumsController = require('../Controllers/albumsController');

const albumRouter = express.Router();

albumRouter.get("/", (req, res) => {
    res.send("Welcome to the testDbConnection API SERVER Is Ready");
});

albumRouter.get("/albums", albumsController.getAllAlbumsList);
albumRouter.get("/albums/:artist", albumsController.getAlbumsByArtist);



// albumRouter.get("/albums/:id", albumsController.getAlbumByID);


module.exports = albumRouter;
