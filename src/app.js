const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // set custom directory for views other than "views"
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Amandeep' 
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Amandeep',
    helpText: 'Amandeep' 
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Amandeep' 
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article does not exists.',
    title: '404',
    name: 'Amandeep'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address && !req.query.coords) {
    return res.send({
      error: 'You must provide an address or use current location for weather forecast.'
    })
  }


  if(req.query.coords) {
    const latitude = req.query.coords.split(',')[0]
    const longitude = req.query.coords.split(',')[1]
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData.description,
        location: forecastData.location
      })
    })
    return // Added to stop execution of below code
  }
 
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData.description,
        location
      })

    })
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found.',
    title: '404',
    name: 'Amandeep'
  })
})

// Changes made for Port before deploying to Heroku
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})