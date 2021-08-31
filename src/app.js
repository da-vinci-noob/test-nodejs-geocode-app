const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const { dir } = require('console')

const app = express()
const port = process.env.port || 3000

// Path Definitions
const viewsPath = path.join(__dirname, '../hbs-templates/views')
const partialsPath = path.join(__dirname, '../hbs-templates/partials')
const publicDir = path.join(__dirname, '../public')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory Path
app.use(express.static(publicDir))

app.get('/', (req, res) => {
  res.render('index', {
    from: 'handlebars',
  })
})

app.get('/geocode', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'No location provided',
    })
  }
  geocode(req.query.location, (error, { lat, long, location } = {}) => {
    if (error) {
      console.log(error)
      return res.send({
        error,
      })
    }
    const locationData = {
      location,
      lat,
      long,
    }
    res.send(locationData)
  })
})

app.get('/lol', (req, res) => {
  res.send('<h1>lololololol!!!</h1>')
})

app.get('*', (req, res) => {
  res.send('Content Not Found!!!')
})

app.listen(port, () => {
  console.log(`Server Running!!! on port ${port}`)
})
