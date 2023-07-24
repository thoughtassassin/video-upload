var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET video progress. */
router.get('/', function(req, res, next) {
  fileReader = fs.readFile(path.join(__dirname, '../') + 'output.txt', 'utf-8' , (err, data) => {
    if (err) throw err;
    const durationRegEx = /Duration: (.*?), start:/;
    const timeRegEx = /time=(.*?) bitrate/g;
    let durationString = data.match(durationRegEx);
    let timeStrings = data.match(timeRegEx);
    if (timeStrings !== null) {
      let duration = parseInt(getTime(durationString[1]));
      let time = parseInt(getTime(timeStrings.pop()));
      res.send({progress: parseInt((time/duration) * 100) + "% complete"});
    }
  })
});

function getTime(time) {
  const timePartsRegEx = /(\d{2})/g;
  const timeParts = time.match(timePartsRegEx);
  const hours = (parseInt(timeParts[0]) * 360);
  const minutes = (parseInt(timeParts[1]) * 60);
  const seconds = (parseInt(timeParts[2]));
  const fraction = Math.round((parseInt(timeParts[3]) / 100));
  return hours + minutes + seconds + fraction;
}

module.exports = router;
