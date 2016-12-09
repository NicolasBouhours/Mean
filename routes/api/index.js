var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/file', require('./file'));
router.use('/project', require('./project'));
router.use('/project', require('./group'));

module.exports = router;