const express = require('express');
const PublicationController = require('../controllers/publication');
const router = express.Router();
const { auth } = require('../middlewares/auth');const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/publications/');
    },
    filename: (req, file, cb) => {
        const fileName = (`publication-${Date.now()}-${file.originalname}`).replaceAll(' ', '_');
        cb(null, fileName);
    }
});
const upload = multer({ storage });

router.post('/save', [auth, upload.single('file0')], PublicationController.save);
router.get('/detail/:id', auth, PublicationController.detail);
router.delete('/:id', auth, PublicationController.remove);
router.get('/list', auth, PublicationController.list);
router.get('/feed', auth, PublicationController.feed);

module.exports = router;