var fs = require('fs');
var fileReader; 

fs.watchFile('output.txt', { interval: 100 }, (curr, prev) => { 
  fileReader = fs.readFile('output.txt', 'utf-8' , (err, data) => {
    if (err) throw err;
    const durationRegEx = /Duration: (.*?), start:/;
    const timeRegEx = /time=(.*?) bitrate/g;
    let durationString = data.match(durationRegEx);
    let timeStrings = data.match(timeRegEx);
    if (timeStrings !== null) {
      let duration = parseInt(getTime(durationString[1]));
      let time = parseInt(getTime(timeStrings.pop()));
      console.clear();
      console.log(parseInt((time/duration) * 100) + "% complete");
    }
  })
});

function getTime(time) {
  const timePartsRegEx = /(\d{2})/g;
  const timeParts = time.match(timePartsRegEx);
  const hours = (parseInt(timeParts[0]) * 360);
  const minutes = (parseInt(timeParts[1]) * 60);
  const seconds = (parseInt(timeParts[2]));
  const fraction = Math.round((parseInt(timeParts[3]) / 60));
  return hours + minutes + seconds + fraction;
}
