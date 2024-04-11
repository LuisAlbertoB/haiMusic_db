const { createSong } = require('../controllers/song.controller');
const verifyToken = require('../middelware');
const router = express.Router();

router.post('/songs', verifyToken, createSong);

module.exports = router;
