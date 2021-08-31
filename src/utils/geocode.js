const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicG9tb3Z1bW8iLCJhIjoiY2tzb3hpanMyMDBnMDJ2bDR0ZW55dDd5ayJ9.dYwALFO8O9Q50GAxSeLZxg&limit=1`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect location Services', undefined)
    } else if (
      Array.isArray(response.body.features) &&
      !response.body.features.length
    ) {
      callback('Location not Found!!!', undefined)
    } else {
      const data = response.body.features[0]
      callback(undefined, {
        lat: data.geometry.coordinates[1],
        long: data.geometry.coordinates[0],
        location: data.place_name,
      })
    }
  })
}

module.exports = geocode

// How to Use Function
// geocode('los angeles', (error, data) => {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log(`Below are the coordinated of ${data.location}`)
//     console.log(data.lat, data.long)
//   }
// })
