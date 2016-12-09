let express = require('express');
let router = express.Router();
let UserController = require('../../controllers/user.controller');
let auth = require('./../auth');

router.post('/', UserController.createUser);

router.post('/signin', UserController.signIn);

router.get('/profile', auth.required, UserController.getProfile);

router.patch('/password', auth.required, UserController.updatePassword);

router.patch('/', auth.required, UserController.updateUser);

router.post('/forgot', UserController.forgotPassword);

router.post('/reset', UserController.resetPassword);

router.post("/picture", auth.required, UserController.savePicture);

module.exports = router;
