let express = require('express');
let router = express.Router();
let UserController = require('../controllers/user.controller');

router.post('/', UserController.createUser);

router.post('/signin', UserController.signIn);

router.get('/profile', UserController.getProfile);

router.patch('/password', UserController.updatePassword);

router.patch('/', UserController.updateUser);

router.post('/forgot', UserController.forgotPassword);

router.post('/reset', UserController.resetPassword);

router.post("/picture", UserController.savePicture);

module.exports = router;
