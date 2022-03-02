const express = require('express')
const router = express.Router()
const db = require('../models')
require('dotenv').config()

'use strict';
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY

router.get('/', async (req, res) => {
    res.render("notes/notes.ejs")
})

module.exports = router