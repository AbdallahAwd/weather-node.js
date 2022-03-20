const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a057c00e401b29a94312a9d6fd205132&query=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out." +
          "The humidity is " +
          body.current.humidity +
          "The wind speed is " +
          body.current.wind_speed
      );
    }
  });
};

module.exports = forecast;
