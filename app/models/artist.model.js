const mongoose = require('mongoose');

const Artist = mongoose.model(
    "artist",
    new mongoose.Schema({
        name: String,
        birthDay: String,
        bio: String,
        link: String,
    })
);

module.exports = Artist;