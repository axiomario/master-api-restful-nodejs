const express = require('express');
const router = express.Router();
const ArtistController = require('../controllers/artist');

router.post('/', ArtistController.save);
router.get('/details/:id', ArtistController.getDetails);
router.get('/list', ArtistController.list);
router.put('/edit/:id', ArtistController.edit);
router.delete('/remove/:id', ArtistController.remove);

module.exports = router;