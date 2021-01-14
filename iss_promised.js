const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};


const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printPassTimes = (passes) => {
  let output = '';
  for (let pass of passes) {
    let date = new Date(pass.risetime * 1000);
    let dur = pass.duration;
    let dataUTC = date.toUTCString();
    let str = `Nex pass at ${dataUTC}-0700 (Pacific Daylight Time) for ${dur} seconds!\n`;
    output += str;
  }
  console.log(output);
  return output;
};

module.exports = { nextISSTimesForMyLocation, printPassTimes };