const request = require('request')

const forecast = (latitude, longitude, callback) => {
  // const url = 'http://api.weatherstack.com/current?access_key=19ebfabbe4c6a1d01815b54c0a3fc6d9&query=' + latitude + ',' + longitude
  const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHER_STACK_ACCESS_KEY + '&query=' + latitude + ',' + longitude
  request({ url, json: true}, (error, {body} = {}) => {
  if(error) {
    callback('Unable to connect to weather service');
  } else if(body.error) {
    callback('Unable to find location. Please try another location.');
  } else {
    // callback(undefined, {
    //   weatherDescription: body.current.weather_descriptions[0],
    //   temperature: body.current.temperature,
    //   feelsLike: body.current.feelslike
    // })
    const data = {
      description: body.current.weather_descriptions[0] + '. It is currently ' 
      + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is '
      + body.current.humidity + '.',
      location: body.location.name + ', ' + body.location.region + ', ' + body.location.country
    }
    callback(undefined, data)
    // callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' 
    // + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is '
    // + body.current.humidity + '.')
  }
  })
}

module.exports = forecast