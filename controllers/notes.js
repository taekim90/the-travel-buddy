const express = require('express')
const router = express.Router()
const db = require('../models')

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
        console.log(req.body)
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
})

module.exports = router