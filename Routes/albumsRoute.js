const express = require('express');
const albumsController = require('../Controllers/albumsController');

const albumRouter = express.Router();

albumRouter.get("/", (req, res) => {
    res.send("Welcome to the testDbConnection API SERVER Is Ready");
});

albumRouter.get("/albums", albumsController.getAllAlbumsList);
albumRouter.get("/albums/:artist", albumsController.getAlbumsByArtist);
albumRouter.get("/albums/artist/:id", albumsController.getAlbumsArtistByID);
albumRouter.get("/albums/genre/:genre", albumsController.getAlbumsByGenre);
albumRouter.put("/albums/update/:id", albumsController.updateAlbum);

module.exports = albumRouter;
