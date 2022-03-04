const express = require('express')
const app = express() 
const ejsLayouts = require('express-ejs-layouts') 
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cryptojs = require('crypto-js')
const db = require('./models')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
// for yelp api
'use strict';
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY


// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use('/', express.static('public'))
app.use(cookieParser()) // gives us access to req.cookies
app.use(express.urlencoded({extended: false})) // body parser (to make req.body work)
app.use(methodOverride('_method'))


// CUSTOM LOGIN MIDDLEWARE
app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptojs.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decryptedIDString = decryptedId.toString(cryptojs.enc.Utf8) // tells it what type of characters to turn it into
        // then we are querying the database for the user with that id
        const user = await db.user.findByPk(decryptedIDString) // finds user with that primary key with the decrypted ID
        // we are assigning the user to res.locals.user in the routes and user in the ejs
        res.locals.currentUser = user // this give us access to req.user on all routes and on all of our ejs pages we have access to all the users by the use of user
        // res.locals.taco = user
    } else res.locals.currentUser = null
    next() // next is a callback that tells it to move on to the next middleware
})


// CONTROLLERS
app.use('/places', require('./controllers/places.js'))
app.use('/notes', require('./controllers/notes.js'))


// ROUTES
// Home Page
app.get('/', (req, res) => {
    res.render('home.ejs', {error: null})
})

// Logging In From Home Page
app.post('/', async (req, res) => {
    const user = await db.user.findOne({where: {email: req.body.email}})
    if(!user) {
        console.log('the user was not found!')
        res.render('home.ejs', {error: 'Invalid email/password'})
    } else if (!bcrypt.compareSync(req.body.password, user.password)) { 
        console.log('incorrect password')
        res.render('home.ejs', {error: 'Invalid email/password'})
    } else {
        console.log('logging in the user!')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)                                                                                      
        const encryptedUserIdString = encryptedUserId.toString() 
        console.log(encryptedUserIdString)
        res.cookie('userId', encryptedUserIdString) // cookie is an object. userId is the key, encryptedUserIdString is the value
        res.redirect('/user')
    }
})

// Page to Create a New User
app.get('/new', (req, res) => {
    res.render('users/new.ejs', {error: null})
})

// New User Post Route
app.post('/new', async (req,res) => {
    console.log(req.body)
    const [newUser, created] = await db.user.findOrCreate({
        where: {email: req.body.email}
    })
    if(!created) {
        console.log('User already exits!')
        res.render('users/new.ejs', {error: 'Email Already Exists!'}) 
    } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10) // takes 2 variables - plain text password & number of salt rounds
        newUser.password = hashedPassword
        newUser.name = req.body.name
        await newUser.save()
        // encrypt the user id via AES (advanced encryption standard)
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        console.log(encryptedUserIdString)
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/user')
    }
})

// Page displayed after logging in as a user
app.get('/user', (req, res) => {
    if (req.cookies.userId) {
        res.render('users/user.ejs')
    } else {
        res.redirect('/')
    }
})

// Profile Page
app.get('/user/profile', async (req, res) => {
    try {
        const currentUser = await db.user.findOne({
            where: {
                id: res.locals.currentUser.id}})
        res.render('users/profile.ejs', {userInfo: currentUser})
    } catch (err) {
        console.log(err)
    }
})

// Edit Profile Information
app.put('/user/profile', async (req, res) => {
    try {
        const currentUser = await db.user.findOne({
            where: {
                id: res.locals.currentUser.id
            }
        })
        currentUser.update({
            name: req.body.name,
            email: req.body.email
        })
        await currentUser.save()
        // console.log('CURRENT USER INFO: ', currentUser)
        // res.render('users/profile.ejs', {userInfo: currentUser})
        res.redirect('/user/profile')
    } catch (err) {
        console.log(err)
    }
})

// Search Results Page
app.get('/results', async (req, res) => {
    if (req.cookies.userId) {
        try {
            const searchedTerm = await req.query.term
            const searchedLocation = await req.query.location
            // console.log(searchedTerm)
            // console.log(searchedLocation)   
            const searchRequest = {
                term: searchedTerm,
                location: searchedLocation,
            };    
            const client = yelp.client(apiKey);
            
            const response = await client.search(searchRequest)
            console.log(response.jsonBody.businesses[0])
            res.render('results/results.ejs', {response})
        } catch(err) {
            console.log(err)
        }
    }
})

// Logging out will redirect to home page
app.get('/logout', (req, res) => {
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

// About Page
app.get('/about', (req, res) => {
    res.render('about.ejs')
})

// Error Page
app.get('*', (req, res) => {
    res.render('404.ejs')
})

// Port
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})

