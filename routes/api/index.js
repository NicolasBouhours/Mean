var router = require('express').Router();

router.use('/file', require('./file'));
router.use('/project', require('./project'));
router.use('/user', require('./user'));

module.exports = router;