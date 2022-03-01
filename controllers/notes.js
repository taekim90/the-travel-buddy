const express = require('express')
const router = express.Router()
const db = require('./models')
require('dotenv').config()

'use strict';
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY


module.exports = router