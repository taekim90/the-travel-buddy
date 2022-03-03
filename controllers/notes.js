const express = require('express')
const router = express.Router()
const db = require('../models')
require('dotenv').config()

'use strict';
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY

router.get('/', async (req, res) => {
    try {
        const savedNotes = await db.note.findAll({
            include: [db.place]
        })
        console.log("SAVED NOTES:", savedNotes)
        // console.log(savedNotes[0].place.name)
        res.render('notes/notes.ejs', {notesArray: savedNotes})
    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const [note, noteAdded] = await db.note.findOrCreate({
            where: {
                note: req.body.note,
                userId: res.locals.currentUser.id,
                placeId: req.body.id
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/', async (req, res) => {
    // if (req.cookies.userId) {
        try {
            const foundNote = await db.note.findOne({
                where: {
                    note: req.body.note
                },
            })
            await foundNote.destroy();
            res.redirect('/notes')
        } catch (err) {
            console.log(err)
        }
    // } else {
    //     res.redirect('/')
    // }
})



module.exports = router