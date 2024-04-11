const config = require("../config/auth.config");
const db = require("../models");
const Song = db.song;
const User = db.user;

exports.createSong = async (req, res) => {
    const { src, name, lenguage, artist, disk } = req.body;

    const song = new Song({
        src,
        name,
        lenguage,
        artist,
        disk,
        user: req.userId
    });

    try{
        const savedSong = await song.save();
        res.status(200).send({ song: savedSong });
    } catch {
        res.status(500).send({ message: err.message });
    }
};