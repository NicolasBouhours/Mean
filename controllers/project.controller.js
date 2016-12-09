let jwt = require('jsonwebtoken');
let User = require('../models/user');
let Project = require('../models/project');


exports.updateProject = (req, res) => {
  User.findById(req.payload.id, (err, user) => {
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

      if (project.creator.toString() !== user._id.toString()) {
        return res.status(500).json({
            title: 'Impossible, vous n\'êtes pas le créateur de ce tableau',
            error: err
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
}

exports.getProjects = (req, res) => {
  User.findById(req.payload.id).select('_id firstName lastName projects')
    .populate('projects', '_id name description date creator users').exec((err, projects) => {
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
}

exports.createProject = (req, res) => {
  User.findById(req.payload.id, (err, user) => {
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
}

exports.deleteProject = (req, res) => {
  User.findById(req.payload.id, (err, user) => {
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

      if (project.creator.toString() !== user._id.toString()) {
        return res.status(500).json({
            title: 'Impossible, vous n\'êtes pas le créateur de ce tableau',
            error: err
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
}