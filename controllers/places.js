const express = require('express')
const router = express.Router()
const db = require('../models')
require('dotenv').config()

'use strict';
const yelp = require('yelp-fusion');
const user = require('../models/user');
const apiKey = process.env.YELP_API_KEY

router.get('/', async (req, res) => {
    res.render('places/places.ejs')
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const [place, placeCreated] = await db.place.findOrCreate({
            where: {
                name: req.body.name,
                yelpUrl: req.body.yelpUrl,
                category: req.body.category,
            }
        })

    console.log("Place :", place.id)
    console.log("User :", res.locals.currentUser.dataValues.id)

    console.log(place)
    const user = await db.user.findOne({
        where: {
            id: res.locals.currentUser.dataValues.id
        }
    })
    console.log(user)
    await place.addUser(user)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router