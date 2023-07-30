const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

// TODO: extrapolar a un apartado de middlewares
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getPages, postPages, deletePage } = require('../controllers/pages');
const { validateCheckResults } = require('../middlewares/validateCheckResults');
const { validateJwt } = require('../middlewares/validateJwt');

router.use( validateJwt );

router.get('/', getPages);

router.post('/', 
    upload.single('image'), 
    check("description", "description can't be in blank").notEmpty(), 
    check("url", "Must contain a valid URL").trim().isURL(),
    check("rating", "rating must be a number").trim().isNumeric(),
    validateCheckResults, postPages);

router.delete("/:uuid", deletePage);

module.exports = router