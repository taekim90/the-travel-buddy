const express = require('express')
const router = express.Router()
const db = require('../models')
require('dotenv').config()
const methodOverride = require('method-override')

'use strict';
const yelp = require('yelp-fusion');
const user = require('../models/user');
const apiKey = process.env.YELP_API_KEY

router.use(methodOverride('_method'));

router.get('/', async (req, res) => {
    try {
        const savedPlaces = await db.place.findAll({}) // findAll gives us an array
        const savedNotes = await db.note.findAll({})
        console.log(savedPlaces)
        res.render('places/places.ejs', {placesArray: savedPlaces})
    } catch (error) {
        console.log(error)
    }
    // res.render('places/places.ejs')
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
        console.log(place)
        console.log("User :", res.locals.currentUser.dataValues.id)

        const user = await db.user.findOne({
            where: {
                id: res.locals.currentUser.dataValues.id
        }
    })
    console.log(user)
    await place.addUser(user)
    // res.render('places/places.ejs')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router