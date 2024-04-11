const mongoose = require('mongoose');

const Song = mongoose.model(
    "Song",
    new mongoose.Schema({
        src: String,
        name: String,
        lenguage: String,
        artist: String,
        disk: String,
    })
);

module.exports = Song;