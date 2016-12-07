let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let fs = require('fs');

let User = require('../models/user');
const constant = require('../config/constant');

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

router.get('/picture', (req, res, next) => {
    if (req.query.url !== undefined && req.query.url !== '') {
      let decoded = jwt.decode(req.query.token);
      User.findById(decoded.user._id, (err, user) => {
          if (err) {
              return res.status(500).json({
                  title: 'Une erreur est survenue',
                  error: err
              });
          }

          let fileURL = req.query.url;

          if (req.query.url === 'default') {
            fileURL = 'users/default.png';
          }

          let storageURL = constant.STORAGE_PATH + fileURL;

          if(fs.existsSync(storageURL)) {
            let img = fs.readFileSync(storageURL);
            let type = 'image/jpeg';

            if (fileURL.indexOf('.png') > -1) {
              type = 'image/png';
            }

            res.writeHead(200, {'Content-Type': type });
            return res.end(img, 'binary');
          } else {
            return res.status(500).json({
                title: 'Une erreur est survenue',
                error: err
            });
          }
      });
    }
});

module.exports = router;