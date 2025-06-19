const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/users/');
    },
    filename: (req, file, cb) => {
        const fileName = (`user-${Date.now()}-${file.originalname}`).replaceAll(' ', '_');
        cb(null, fileName);
    }
});
const upload = multer({ storage });

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/is-authenticated', auth, UserController.isAuthenticated);
router.get('/profile/:id', auth, UserController.getProfile);
router.get('/list', auth, UserController.getUsers);
router.get('/list/:page', auth, UserController.getUsers);
router.put('/update', auth, UserController.update);
router.put('/update-image', [auth, upload.single('file0')], UserController.updateImage);
router.get('/image', auth, UserController.getUserImageFile);

module.exports = router;