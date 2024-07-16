const mssql = require("mssql");
const dbConnect = require("../DBConfig/config.db");

class Album {
  //Create Album:
  static async create(albumData) {
    const {
      title,
      artist_id,
      genre_id,
      release_year,
      musiclabel_id,
      hit_song,
    } = albumData;

    try {
      const pool = await dbConnect;
      const result = pool
        .request()
        .input("title", mssql.VarChar, title)
        .input("artist_id", mssql.Int, artist_id)
        .input("genre_id", mssql.Int, genre_id)
        .input("release_year", mssql.Int, release_year)
        .input("musiclabel_id", mssql.Int, musiclabel_id)
        .input("hit_song", mssql.VarChar, hit_song)
        .query(`
             INSERT INTO albums (title, artist_id, genre_id, release_year, musiclabel_id, hit_song) 
             OUTPUT INSERTED.*
             VALUES (@title, @artist_id, @genre_id, @release_year, @musiclabel_id, @hit_song)
              `);
      return result.recordset[0];
    } catch (err) {
      throw new Error("Error creating album:" + err.message);
    }
  }

  //Update Album:
  static async updateAlbum(album_id, albumData) {
    const {
      title,
      artist_id,
      genre_id,
      release_year,
      musiclabel_id,
      hit_song,
    } = albumData;

    try {
      const pool = dbConnect;
      const result = pool
        .request()
        .input("album_id", mssql.Int, album_id)
        .input("title", mssql.VarChar, title)
        .input("artist_id", mssql.Int, artist_id)
        .input("genre_id", mssql.Int, genre_id)
        .input("release_year", mssql.Int, release_year)
        .input("musiclabel_id", mssql.Int, musiclabel_id)
        .input("hit_song", mssql.VarChar, hit_song).query(`
          UPDATE albums
          SET title = @title, artist_id = @artist_id, genre_id = @genre_id, release_year = @release_year, musiclabel_id = @musiclabel_id, hit_song = @hit_song
          OUPUT INSERTED.*
          WHERE album_id = @album_id
        `);
      return result.rowsAffected[0];
    } catch (err) {
      throw new Error("Error updating album:" + err.message);
    }
  }

  //Delete Album:
  static async deleteAlbum(album_id) {
    try {
      const pool = await dbConnect;
      const result = pool
        .request()
        .input("album_id", mssql.Int, album_id)
        .query(`
          DELETE FROM albums
          OUTPUT DELETED.*
          WHERE album_id = @album_id
        `);
      return result.recordset[0];
    } catch (err) {
      throw new Error("Error deleting album:" + err.message);
    }
  }

  //Add other static methods for CRUD operations:
}


module.exports = {
    Album
};
