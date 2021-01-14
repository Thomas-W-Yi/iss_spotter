const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log(err);
    return;
  } else {
    
    fetchCoordsByIP(JSON.parse(ip).ip, (err, coord) => {
      if (err) {
        
        return;
      } else {
        
        fetchISSFlyOverTimes(coord, (err, passes) => {
          if (err) {
            
            return;
          } else {
            
            nextISSTimesForMyLocation(passes, (output) => {
              console.log(output);
            });
          }
        });
      }
    });
  }
});