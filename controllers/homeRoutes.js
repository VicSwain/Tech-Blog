const router = require("express").Router();
const { User, Comment, Post } = require("../models");
// const withAuth = require('../utils/auth');
//RES.RENDER()

//get route to home page
//req working
router.get("/", async (req, res) => {
  try {
    const blogData = await Post.findAll({
      // look in pgAdmin at erd of db
      include: [
        { model: Comment, include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
    });
    const blogs = blogData.map(blog => blog.get({plain:true}))
    console.log("=========================================")
    console.log(blogs)
    console.log("=========================================")

    res.render("homepage", {blogs: blogs,});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:post_id", async (req,res) => {
    const postData = await Post.findByPk(req.params.post_id, {      include: [
        { model: Comment, include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
})
    const post = postData.get({plain: true})
    console.log("_+__________________________")
    console.log(post)
    res.render("singlePost", {post})
})

router.get("/signup", async (req, res) => {
  res.render("signUpPage");
});
// localhost:3001/poop

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

router.get("/profile", async (req,res) => {
    res.render("dashboard")
})
module.exports = router;
