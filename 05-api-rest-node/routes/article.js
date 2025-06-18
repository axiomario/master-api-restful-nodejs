const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticle);
router.post('/', articleController.save);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
router.get('/search/:search', articleController.searchArticles);

module.exports = router;