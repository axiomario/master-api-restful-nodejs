const express = require('express');
const router = express.Router();
const SongController = require('../controllers/song');

router.post('/', SongController.save);
router.get('/:id', SongController.details);
router.get('/album/:albumId', SongController.songsByAlbum);
router.put('/:id', SongController.update);
router.delete('/:id', SongController.remove);

module.exports = router;