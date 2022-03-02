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
        // const user = await db.users_places.findOne({
        //     where: {
        //         id: res.locals.currentUser.dataValues.id
        //     }
        // })
        const savedPlaces = await db.place.findAll({
            include: [db.user]
        }) // findAll gives us an array
        // savedPlaces.forEach(place => {
        //     console.log(place.getUsers())
        // });
        // const foundPlace = await db.place.findOne({
        //     where: {
        //         id: 12
        //     }
        // })
        // console.log(await foundPlace.getUsers())

        res.render('places/places.ejs', {placesArray: savedPlaces})
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
            }
        })   
        // console.log("Place :", place.id)
        // console.log(place)
        // console.log("User :", res.locals.currentUser.dataValues.id)
        const user = await db.user.findOne({
            where: {
                id: res.locals.currentUser.id
            }
        })
    console.log(user)
    await place.addUser(user)
    // res.render('places/places.ejs')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/', async (req, res) => {
    // if (req.cookies.userId) {
        try {
            const foundPlace = await db.place.findOne({
                where: {
                    name: req.body.name,
                    yelpUrl: req.body.yelpUrl,
                    category: req.body.category
                },
            })
            await foundPlace.destroy();
            res.redirect('/places')
        } catch (err) {
            console.log(err)
        }
    // } else {
    //     res.redirect('/')
    // }
})

module.exports = router