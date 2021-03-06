const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', async (req, res) => {
    try {
        const foundPlaces = await res.locals.currentUser.getPlaces()
        res.render('places/places.ejs', {
            placesArray: foundPlaces,
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const [place, placeCreated] = await db.place.findOrCreate({
            where: {
                name: req.body.name,
                yelpUrl: req.body.yelpUrl,
                category: req.body.category,
                address: req.body.address,
            }
        })   
        // console.log("User :", res.locals.currentUser.dataValues.id)
        const user = await db.user.findOne({
            where: {
                id: res.locals.currentUser.id
            }
        })
        // can take lines 28-32 and remove it and just put res.locals.currentUser into the "user" below
    await place.addUser(user)
    res.redirect('/places')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/', async (req, res) => {
    try {
        const foundPlace = await db.users_places.findOne({
            where: {
                userId: res.locals.currentUser.id,
                placeId: req.body.id
            },
        })
        await foundPlace.destroy();
        res.redirect('/places')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router