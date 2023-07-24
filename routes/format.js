var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const { exec } = require('child_process');
var path = require('path');

/* POST process file upload */
router.post('/',  upload.single('video'), function(req, res, next) {
  const filename = req.body.name.replace(/\s/g, '') + '.mp4';
  exec('ffmpeg -i ' + req.file.path + ' -s ' + req.body.format + ' -b 400k -ar 44100  -ab 128k public/videos/' + filename + ' 1> output.txt 2>&1');
  res.sendFile(path.join(__dirname, '../public/') + 'upload.html');
});

module.exports = router;