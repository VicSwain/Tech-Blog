const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


//get route to home page 
router.get('/', async (req, res) => {
    res.render('homepage');
});

router.get('/login', async (req,res) => {
    res.render("login")
})


module.exports = router;