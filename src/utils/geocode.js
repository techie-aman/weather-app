const request = require('request')

const geocode = (address, callback) => {
  // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1hbmRlZXAxMDAyOTYiLCJhIjoiY2w3Zm14cHlhMGJ0cjN1bXpoNGx6Z2c0bSJ9.SbJPSY1Zm0Wnegmi77yM6g&limit=1'
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=' + process.env.MAP_BOX_ACCESS_TOKEN + '&limit=1'
  request({url, json: true}, (error, {body} = {}) => {
    if(error) {
      callback('Unable to connect to location service.')
    } else if(body.features.length === 0) {
      callback('Unable to find the location. Please try another search.')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode