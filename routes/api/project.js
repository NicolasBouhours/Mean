let express = require('express');
let router = express.Router();
let ProjectController = require('../../controllers/project.controller');
let GroupController = require('../../controllers/group.controller');
let AuthMiddleware = require('../../middlewares/auth.middleware');
let auth = require('./../auth');

router.get('/', auth.required, ProjectController.getProjects);
router.get('/:id', auth.required, ProjectController.getProject);
router.post('/', auth.required, ProjectController.createProject);
router.patch('/:id', auth.required, ProjectController.updateProject);
router.delete('/:id', auth.required, ProjectController.deleteProject);

module.exports = router;