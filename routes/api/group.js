let express = require('express');
let router = express.Router();
let GroupController = require('../../controllers/group.controller');
let auth = require('./../auth');

router.get('/:projectId/group', auth.required, GroupController.getGroups);
router.post('/:projectId/group', auth.required, GroupController.createGroup);
router.patch('/:projectId/group/:id', auth.required, GroupController.updateGroup);

module.exports = router;
