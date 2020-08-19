const express = require('express')
const router = express.Router();
const Busboy = require('busboy');
const blobStorage = require('../services/blobStorage');

router.post('/upload', function(req, res) {

  var busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      blobStorage.saveToBlob(filename, file, function(err, result){
      if(err) {
          res.setEncoding(500, err);
      } else {
          res.redirect('/show?name=' + encodeURI(filename));
      }
      });
  });
  req.pipe(busboy);
  });


module.exports = router;