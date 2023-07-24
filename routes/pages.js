const { Router } = require('express');
const router = Router();

// TODO: extrapolar a un apartado de middlewares
const multer = require('multer');
const upload = multer({ dest: 'upload/'});

const { getPages, postPages, deletePage } = require('../controllers/pages');

router.get('/', getPages);

router.post('/', upload.single('imagen'), postPages);

router.delete("/:uuid", deletePage);

module.exports = router