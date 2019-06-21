const express = require('express')
const router = express.Router()
require('../config/passport-setup')
const passport = require('passport')
require('./profileRoutes')

router.get('/login', (req, res) =>{
    res.render('login')
})

router.get('/logout', (req, res) =>{
    req.logOut()
    console.log('logout')
    res.redirect('/')
})

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/github/redirect' , passport.authenticate('github', {
    successRedirect:'/profile/userdata',
    failureRedirect:'/'
}), (req, res) =>{
    res.redirect('/profile/userdata')
})

module.exports = router