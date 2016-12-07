let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
let nodemailer = require('nodemailer');
let fs = require('fs');
let mkdirp = require('mkdirp');
let User = require('../models/user');
const constant = require('../config/constant');

router.post('/', (req, res, next) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        picture: 'default'
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
                title: 'Les identifiants sont incorrects',
                error: {message: 'Les identifiants sont incorrects'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(500).json({
                title: 'Les identifiants sont incorrects',
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

router.get('/profile', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findOne({_id: decoded.user._id}, {email: 0, password: 0},  (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'Impossible de récupèrer les informations utilisateur',
                error: err
            });
        }
        if(!user) {
            return res.status(500).json({
                title: 'Erreur',
                error: {message: 'Impossible de récupèrer les informations utilisateur'}
            });
        }

        res.status(200).json({
            message: 'Informations récupèrées avec succès',
            obj: user
        });
    });
});

router.patch('/password', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findOne({_id: decoded.user._id}, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }

        if(!user) {
            return res.status(500).json({
                title: 'Impossible de mettre à jour le mot de passe',
                error: {message: 'Impossible de mettre à jour le mot de passe'}
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(500).json({
                title: 'Le mot de passe ne correspond pas a l\'actuel mot de passe',
                error: {message: 'Le mot de passe ne correspond pas a l\'actuel mot de passe'}
            });
        }
        
        if (req.body.newPassword !== req.body.newConfirmPassword) {
            return res.status(500).json({
                title: 'Les deux mots de passe ne sont pas identiques',
                error: {message: 'Les deux mots de passe ne sont pas identiques'}
            });    
        }

        user.password = bcrypt.hashSync(req.body.newPassword, 10);

        user.save((error, savedUser) => {
            if(error) {
                return res.status(500).json({
                    title: 'Impossible de mettre à jour le mot de passe',
                    error: {message: 'Impossible de mettre à jour le mot de passe'}
                });
            }
            res.status(200).json({
                message: 'Mot de passe mis a jour avec succès'
            });
        });
    });
});

router.patch('/', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findOne({_id: decoded.user._id}, {email: 0, password: 0},  (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }
        if(!user) {
            return res.status(500).json({
                title: 'Impossible de récupèrer les informations utilisateur',
                error: {message: 'Impossible de récupèrer les informations utilisateur'}
            });
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        user.save((err, savedUser) => {
            if (err) {
                return res.status(500).json({
                    title: 'Une erreur est survenue',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Utilisateur mis a jour avec succès'
            });
        });
    });
});

router.post('/forgot', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }

        if(!user) {
            return res.status(500).json({
                title: 'Aucun compte avec cet email n\'a été trouvé',
                error: {message: 'Aucun compte avec cet email n\'a été trouvé'}
            });
        }
        
        crypto.randomBytes(48, function(err, buffer) {
            if (err) {
                return res.status(500).json({
                    title: 'Une erreur est survenue',
                    error: err
                });
            }
            const token = buffer.toString('hex');

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; 

            user.save(function(err, savedUser) {
                if (err) {
                    return res.status(500).json({
                        title: 'Une erreur est survenue',
                        error: err
                    });
                }

                // on envoie un email
                console.log('send email', savedUser);
                let transporter = nodemailer.createTransport('smtps://nicolas.bouhours5396@gmail.com:nicodu5396@smtp.gmail.com');

                let mailOptions = {
                    from: '"Mean Stack" <nicolas.bouhours5396@gmail.com>', // sender address
                    to: 'nico53960@hotmail.fr, nicolas.bouhours5396@gmail.com', // list of receivers
                    subject: 'Mean : Réintialisation de mot de passe', // Subject line
                    /*text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'*/
                    html: '<html><head><link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"><style>html{text-align: center} .btn{color:#00d1b2;text-decoration:none}</style></head>' + 
                    '<h3> Bonjour ' + user.firstName + ' ' + user.lastName + '</h3>' +
                    '<p>Vous avez récemment fait une demande de réinitialisation de mot de passe.</p><p>Merci de cliquer sur le lien ci-dessous pour choisir votre nouveau mot de passe</p>' +
                    '<a class="btn" href="http://'+ req.headers.host +'/auth/reset/' + token +'">Réinitiliser mon mot de passe</a></html>'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return res.status(500).json({
                            title: 'Impossible d\'envoyer l\'email de récupération de mot de passe',
                            error: {message: 'Impossible d\'envoyer l\'email de récupération de mot de passe'}
                        });
                    }
                    res.status(200).json({
                        message: 'Email de réinitialisation envoyé'
                    });
                });
            });
        });
    });
});

router.post('/reset', (req, res, next) => {
    User.findOne({_token: req.body.resetPasswordToken, resetPasswordExpires: { $gt: Date.now() }}, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }

        if(!user) {
            return res.status(500).json({
                title: 'La demande de mot de passe est trop ancienne(plus de deux heures), veuillez recommencer',
                error: {message: 'La demande de mot de passe est trop ancienne(plus de deux heures), veuillez recommencer'}
            });
        }
        
        user.password = bcrypt.hashSync(req.body.password, 10);

        user.save((err, savedUser) => {
            if (err) {
                return res.status(500).json({
                    title: 'Une erreur est survenue',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Mot de passe réinitialiser avec succès'
            });
        });
    });
});

router.post("/picture", (req, res, next) => {
    let decoded = jwt.decode(req.query.token);

    User.findOne({_id: decoded.user._id}, {email: 0, password: 0},  (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
        }

        if(!user) {
            return res.status(500).json({
                title: 'Impossible de retrouver l\'utilisateur',
                error: {message: 'Impossible de retrouver l\'utilisateur'}
            });
        }
        if (req.files.file === undefined) {
            return res.status(500).json({
                title: 'Impossible de récupèrer l\'image',
                error: {message: 'Impossible de récupèrer l\'image'}
            });
        }

        console.log(req.files.file);

        if (req.files.file.mimetype !== 'image/png' && req.files.file.mimetype !== 'image/jpeg') {
           return res.status(500).json({
                title: 'Veuillez envoyer une image',
                error: {message: 'Veuillez envoyer une image'}
            }); 
        }

        const folderPath = constant.STORAGE_PATH + 'users/' + user._id;
        const pictureUrl = 'users/' + user._id;
        const filePath = folderPath + '/' + req.files.file.filename;
        const fileUrl = pictureUrl + '/' + req.files.file.filename;
        mkdirp(folderPath, (err) => {
            if (err) {
                return res.status(500).json({
                    title: 'Impossible de sauvegarder l\'image',
                    error: {message: 'Impossible de sauvegarder l\'image'}
                });
            }

            fs.createReadStream(req.files.file.file).pipe(fs.createWriteStream(filePath));

            user.picture = fileUrl;

            user.save((err, savedUser) => {
                if (err) {
                    return res.status(500).json({
                        title: 'Une erreur est survenue',
                        error: err
                    });
                }

                res.status(200).json({
                    message: 'Photo de profil modifié avec succès',
                    obj: fileUrl
                });
            });
        });
    });
});

module.exports = router;
