let jwt = require('jsonwebtoken');
let Group = require('../models/group');
let Project = require('../models/project');
let User = require('../models/user');

exports.getGroups = (req, res) => {
    Project.findById(req.params.projectId).select('_id groups').populate('groups').exec((err, groups) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }
        res.status(201).json({
            obj: groups
        });
    });
}

exports.createGroup = (req, res) => {

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

    Project.findById(req.params.projectId, (err, project) => {
        if (err) {
            return res.status(500).json({
                title: 'Impossible de sauvegarder le groupe',
                error: err
            });
        }
        if(!project) {
            return res.status(500).json({
                title: 'Impossible de sauvegarder le groupe',
                error: err
            });  
        }


        let group = new Group();
        group.name = req.body.name;
        group.creator = user;
        group.project = project;

        group.save((err, savedGroup) => {
            if (err) {
                return res.status(500).json({
                    title: 'Impossible de sauvegarder le groupe',
                    error: err
                });
            }

            project.groups.push(savedGroup);
            project.save((err, savedProject) => {
                if (err) {
                    return res.status(500).json({
                        title: 'Impossible de sauvegarder le groupe',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Groupe ajouté avec succès',
                    obj: savedGroup
                });
            });
        });
    });
  });
}

exports.updateGroup = (req, res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) {
            return res.status(500).json({
                title: 'Impossible de mettre à jour le groupe',
                error: err
            });
        }
        group.name = req.body.name;

        group.save((err, savedGroup) => {
            if (err) {
                return res.status(500).json({
                    title: 'Impossible de mettre à jour le groupe',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Groupe mis à jour avec succès',
                obj: savedGroup
            });
        });
    });
}

exports.activeGroup = (req, res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) {
            return res.status(500).json({
                title: 'Impossible de mettre à jour le groupe',
                error: err
            });
        }
        group.active = true;

        group.save((err, savedGroup) => {
            if (err) {
                return res.status(500).json({
                    title: 'Impossible de mettre à jour le groupe',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Groupe désarchivé avec succès',
                obj: savedGroup
            });
        });
    });
}

exports.desactiveGroup = (req, res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) {
            return res.status(500).json({
                title: 'Impossible de mettre à jour le groupe',
                error: err
            });
        }
        group.active = false;

        group.save((err, savedGroup) => {
            if (err) {
                return res.status(500).json({
                    title: 'Impossible de mettre à jour le groupe',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Groupe archivé avec succès',
                obj: savedGroup
            });
        });
    });
}