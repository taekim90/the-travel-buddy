const express = require('express')
const router = express.Router()
const db = require('../models')
require('dotenv').config()

'use strict';
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY

router.get('/', (req, res) => {
    res.render('notes/notes.ejs')
})

router.post('/', async (req, res) => {
    try {

        const savedNotes = await db.notes.findOrCreate({
            where: {
                userId: req.body.userId,
                placeId: req.body.placeId,
                note: req.body.note,
            }
        }) // findAll gives us an array

        console.log(savedPlaces)
        console.log(user)
        res.render('notes/notes.ejs', {placesArray: savedPlaces})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router