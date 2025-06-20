const express = require('express');
const FollowController = require('../controllers/follow');
const router = express.Router();
const { auth } = require('../middlewares/auth');

router.post('/save', auth, FollowController.save);
router.post('/unfollow', auth, FollowController.unfollow);
router.get('/following/:id', auth, FollowController.following);
router.get('/followers/:id', auth, FollowController.getFollowers);

module.exports = router;