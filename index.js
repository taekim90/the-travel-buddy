const express = require('express')
const app = express() 
const ejsLayouts = require('express-ejs-layouts') 
require('dotenv').config()
// const axios = require('axios')
// const cookieParser = require('cookie-parser')
// const cryptoJS = require('crypto-js')
// const db = require('./models/index.js')

'use strict';
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY



// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// CONTROLLERS

// ROUTES
app.get('/', (req, res) => {
    res.render('main/index.ejs')
})

// app.get('/', (req,res) => {
//     const searchRequest = {
//         term: 'hotels',
//         location: 'portland',
//     };
      
//     const client = yelp.client(apiKey);
      
//     client.search(searchRequest)
//     .then((response) => {
//         console.log(response.jsonBody);
//         res.json(response.jsonBody)
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// })


app.get('*', (req, res) => {
    res.render('main/404')
  })


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})