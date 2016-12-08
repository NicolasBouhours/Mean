let jwt = require('jsonwebtoken');

exports.authenticatedUser = (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: 'Utilisateur non authentifié',
                error: err
            });
        }
        next();
    });
}