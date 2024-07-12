const AlbumList = require("../sampleData");


module.exports.getAllAlbumsList = (req, res) => {
    const albumsList = AlbumList;

    if(albumsList){
        res.status(200).json(albumsList);
     } else {
        res.status(404).json({ message: "Albums not found" });
      } 
    }

module.exports.getAlbumByID = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const album = AlbumList[id];
    if(album){
        res.status(200).json(album);
     } else {
        res.status(404).json({ message: "Album not found" });
      }
}

