const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');

router.post('/', AlbumController.save);
router.get('/:id', AlbumController.details);
router.get('/artist/:artistId', AlbumController.albumsByArtist);
router.put('/:id', AlbumController.update);

module.exports = router;