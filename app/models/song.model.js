const mongoose = require('mongoose');

const Song = mongoose.model(
    "song",
    new mongoose.Schema({
        fileSrc: String,
        name: String,
        author: String,
        Disk: String,
        numberAlbum: Number,
        description: String,
        dredits: String,
    })
);

module.exports = Song;