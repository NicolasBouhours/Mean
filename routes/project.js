let express = require('express');
let router = express.Router();
let ProjectController = require('../controllers/project.controller');
let GroupController = require('../controllers/group.controller');

let AuthMiddleware = require('../middlewares/auth.middleware');

router.use('/', AuthMiddleware.authenticatedUser);
router.get('/', ProjectController.getProjects);
router.post('/', ProjectController.createProject);
router.patch('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

router.get('/:projectId/group', GroupController.getGroups);
router.post('/:projectId/group', GroupController.createGroup);
router.patch('/:projectId/group/:id', GroupController.updateGroup);

module.exports = router;