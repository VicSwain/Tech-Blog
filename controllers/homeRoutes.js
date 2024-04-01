const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
router.use((req,res, next) => {
    console.log("+++++++++++++==+++++++++++= NEW HOME ROUTE HIT++=++++++==++++++=+=+=++++++++++++")
    next()
})

//get route to home page 
router.get('/', async (req, res) => {
    console.log("Homepage toure stuff here")
    var name = "Alex"
    res.render('homepage', {
        name,
        logged_in: req.session.logged_in
    });
});

router.get('/login', async (req,res) => {
      // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
    res.render("login")
})

router.get("/signup", async(req,res) => {
    res.render("signup")
})

module.exports = router;