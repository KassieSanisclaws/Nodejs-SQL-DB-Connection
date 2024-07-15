const { mssql, DataTypes } = require("mssql");

const Album = mssql.module()
  {
    album_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    musiclabel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hit_song: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "albums",
    timestamps: false,
  }
);

module.exports = Album;
