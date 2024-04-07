const router = require('express').Router();
const { User, Comment, Post } = require('../models');
// const withAuth = require('../utils/auth');


//get route to home page 
router.get('/', async (req, res) => {
    try {
        const blogData = await Post.findAll({
            // look in pgAdmin at erd of db
            include: [{ model: Comment, include: {model: User, attributes: ['username']} }, { model: User, attributes: ['username'] }]
        });
        res.json(blogData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});














// router.get('/login', async (req,res) => {
//       // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }
//     res.render("login")
// })

// router.get("/signup", async(req,res) => {
//     res.render("signup")
// })

module.exports = router;