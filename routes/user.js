let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let User = require('../models/user');

router.post('/', (req, res, next) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });

    user.save((err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }
        res.status(201).json({
            message: 'Utilisateur crée avec succès',
            obj: result
        });
    });
});

router.post('/signin', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }

        if(!user) {
            return res.status(500).json({
                title: 'Echec de la connexion',
                error: {message: 'Les identifiants sont incorrects'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(500).json({
                title: 'Echec de la connexion',
                error: {message: 'Les identifiants sont incorrects'}
            });
        }
        let token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Connecté avec succès',
            token: token,
            userId: user._id
        });
    });
});



module.exports = router;
