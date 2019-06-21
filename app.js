//loading some core and required modules

const express = require('express')
const authRoutes = require('./auth/authRoutes')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const app = express()
const profileRoutes = require('./auth/profileRoutes')
//set port for localhost and production site
const port = process.env.PORT || 3000

//setting up database
mongoose.connect(keys.mongodb.mongoURL ,{
    useNewUrlParser: true,
    useCreateIndex: true
})

//setting up the cookies
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))


//initializing passport to use session

app.use(passport.initialize())
app.use(passport.session())

//setting up view engine for templating
app.set('view engine', 'hbs')

//using authRoutes in app.js
app.use('/auth', authRoutes)
//using profile routes

app.use('/profile', profileRoutes)

//main page of the website
app.get('/', (req, res) =>{
    res.render('home')
})









//setting up express server
app.listen(port , () =>{
    console.log(`server is running on port ${port}`)
})