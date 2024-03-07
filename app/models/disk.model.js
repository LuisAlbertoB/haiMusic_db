const mongoose = require('mongoose');

const Disk = mongoose.model(
    "disk",
    new mongoose.Schema({
        name: String,
        author: String,
        realeseDate: String,
        NumbersOfSong: Number,
        Description: String,
        Credits: String,
    })
);

module.exports = Disk;