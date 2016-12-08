let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();

let User = require('../models/user');
let Project = require('../models/project');

router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: 'Utilisateur non authentifié',
                error: err
            });
        }
        next();
    });
});

router.get('/', (req, res) => {
  let decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id).select('_id firstName lastName projects')
    .populate('projects', '_id name description date users').exec((err, projects) => {
    if (err) {
      return res.status(500).json({
        title: 'Une erreur est survenue',
        error: err
      });
    }
    res.status(201).json({
      obj: projects
    });
  });
});

router.post('/', (req, res) => {
  let decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if (err) {
        return res.status(500).json({
            title: 'Une erreur est survenue',
            error: err
        });
    }
    if (!user) {
      return res.status(500).json({
        title: 'Tableaux non trouvés',
        error: {message: 'Tableux non trouvés'}
      });
    }

    let project = new Project({
      name: req.body.name,
      description: req.body.description,
      creator: user,
      users: [user]
    });

    project.save((err, savedProject) => {
      if (err) {
        return res.status(500).json({
          title: 'Impossible de sauvegarder le tableau',
          error: err
        });
      }
      user.projects.push(savedProject);
      user.save((err, savedUser) => {
        if (err) {
          return res.status(500).json({
            title: 'Impossible de sauvegarder le tableau',
            error: err
          });
        }
        res.status(201).json({
          message: 'Tableau ajouté avec succès',
          obj: savedProject
        });
      });
    });
  });
});

router.patch('/:id', (req, res) => {
  let decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if (err) {
        return res.status(500).json({
            title: 'Une erreur est survenue',
            error: err
        });
    }
    if (!user) {
      return res.status(500).json({
        title: 'Tableaux non trouvés',
        error: {message: 'Tableux non trouvés'}
      });
    }

    Project.findById(req.params.id, (err, project) => {
      if (err || !project) {
        return res.status(500).json({
          title: 'Tableaux non trouvés',
          error: {message: 'Tableux non trouvés'}
        });
      }

      project.name = req.body.name;
      project.description = req.body.description;

      project.save((err, savedProject) => {
        if (err) {
          return res.status(500).json({
            title: 'Impossible de mettre à jour le tableau',
            error: err
          });
        }
        res.status(201).json({
          message: 'Tableau mis à jour avec succès',
          obj: savedProject
        });
      });
    });
  });
});

router.delete('/:id', (req, res) => {
  let decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if (err) {
        return res.status(500).json({
            title: 'Une erreur est survenue',
            error: err
        });
    }
    if (!user) {
      return res.status(500).json({
        title: 'Tableaux non trouvés',
        error: {message: 'Tableux non trouvés'}
      });
    }

    Project.findById(req.params.id, (err, project) => {
      if (err || !project) {
        return res.status(500).json({
          title: 'Tableaux non trouvés',
          error: {message: 'Tableux non trouvés'}
        });
      }
      project.remove((err, removedProject) => {
        if (err) {
          return res.status(500).json({
            title: 'Impossible de supprimé le tableau',
            error: err
          });
        }
        res.status(201).json({
          message: 'Tableau supprimé avec succès'
        });
      });
    });
  });
});

module.exports = router;