const express = require('express')
const router = express.Router()

const authCheck = (req,res,next)=>{
    if(!req.user){
        res.redirect('/')
    } else{
        next()
    }
}

router.get('/userdata', authCheck,  (req, res) =>{
    res.render('profile')
})


module.exports = router