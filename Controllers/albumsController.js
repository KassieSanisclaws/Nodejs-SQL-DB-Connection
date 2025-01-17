const mssql = require("mssql");
const dbConnect = require("../DBConfig/config.db");
const Album = require("../Models/albumsModel");

const getAllAlbumsList = async (req, res) => {
  try {
    const result = await dbConnect.request().query("SELECT * FROM albums");
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAlbumsArtistByID = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await dbConnect
      .request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM albums WHERE artist_id = @id");
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAlbumsByArtist = async (req, res) => {
  const artist = req.params.artist;
   try {
    const result = await dbConnect
      .request()
      .input("artist", mssql.VarChar, artist)
      .query(
        "SELECT * FROM albums WHERE artist_id = (SELECT artist_id FROM artists WHERE name = @artist)"
      );
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAlbumsByGenre = async (req, res) => {
  const genre = req.params.genre;
  try {
    const result = await dbConnect
      .request()
      .input("genre", mssql.VarChar, genre)
      .query(
        "SELECT * FROM albums WHERE genre_id = (SELECT genre_id FROM genres WHERE name = @genre)"
      );
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createAlbum = async (req, res) => {
  const { title, artist_id, genre_id, release_year, musiclabel_id, hit_song } = req.body;
  try {
    const newAlbum = await Album.create({
      title,
      artist_id,
      genre_id,
      musiclabel_id,
      release_year,
      hit_song,
    });
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateAlbum = async (req, res) => {
    const album_id = req.params.album_id;
    const albumData = req.body;

    try {
        const updatedAlbum = await Album.updateAlbum(album_id, albumData);
        res.status(200).json(updatedAlbum);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
 };

module.exports = {
  getAllAlbumsList,
  getAlbumsByArtist,
  getAlbumsByGenre,
  createAlbum,
  getAlbumsArtistByID,
  updateAlbum,

};
