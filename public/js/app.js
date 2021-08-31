console.log('Hello')

var address = '!'

const locationForm = document.querySelector('form')
const searchElement = document.querySelector('input')

locationForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = searchElement.value
  document.querySelector('p#location').textContent = `Loading...`
  document.querySelector('p#latitude').textContent = ''
  document.querySelector('p#longitude').textContent = ''

  fetch(`/geocode?location=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.querySelector(
          'p#location'
        ).textContent = `Error: ${data.error}`
        console.log(locationData)
        return console.log({ error: data.error })
      }
      var locationData = {
        lat: data.lat,
        long: data.long,
        location: data.location,
      }
      document.querySelector(
        'p#location'
      ).textContent = `Location: ${locationData.location}`
      document.querySelector(
        'p#latitude'
      ).textContent = `Latitude: ${locationData.lat}`
      document.querySelector(
        'p#longitude'
      ).textContent = `Longitude: ${locationData.long}`
      console.log(locationData)
    })
  })
})
