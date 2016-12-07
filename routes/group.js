let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();

let User = require('../models/user');
let Group = require('../models/group');

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

router.get('/', (err, res) => {
  let decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id).select('_id firstName lastName')
    .populate('groups', '_id name date users').exec((err, user) => {
    if (err) {
      return res.status(500).json({
        title: 'Une erreur est survenue',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'Groupes non trouvés',
        error: {message: 'Groupes non trouvés'}
      });
    }
    res.statu(201).json({
      obj: user
    });
  });
});

router.post('/', (err, res) => {

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
        title: 'Groupes non trouvés',
        error: {message: 'Groupes non trouvés'}
      });
    }

    let group = new Group({
      name: req.body.name,
      creator: user,
      users: [user]
    });

    group.save((err, savedGroup) => {
      if (err) {
        return res.status(500).json({
          title: 'Impossible de sauvegarder le groupe',
          error: err
        });
      }
      user.groups.push(savedGroup);
      user.save((err, savedUser) => {
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

module.exports = router;