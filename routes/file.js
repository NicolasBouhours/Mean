let express = require('express');
let router = express.Router();
let FileController = require('../controllers/file.controller');
let AuthMiddleware = require('../middlewares/auth.middleware');

router.use('/', AuthMiddleware.authenticatedUser);

router.get('/picture', FileController.getPicture);

module.exports = router;