const router = require("express").Router();
const { User, Comment, Post } = require("../models");
const withAuth = require('../utils/auth');
//RES.RENDER()

//get route to home page
//req working
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      // look in pgAdmin at erd of db
      include: [
        { model: Comment, include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
    });
    const posts = postData.map(post => post.get({plain:true}))
    console.log("=========================================")
    console.log(posts)
    console.log("=========================================")

    res.render("homepage", {posts: posts, logged_in: req.session.logged_in});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req,res) => {
    const postData = await Post.findByPk(req.params.id, {      include: [
        { model: Comment, include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
      
})
console.log(postData);
    const post = postData.get({plain: true})
    console.log("_+__________________________")
    console.log(post)
    console.log(post.user.user);
    res.render("singlePost", {post, logged_in: req.session.logged_in});
})

router.get("/signup", async (req, res) => {
  res.render("signUp");
});
// localhost:3001/poop

router.get('/login', async (req,res) => {
      // If the user is already logged in, redirect the request to another route
 try {
      if (req.session.logged_in) {
        console.log(req.session.user_id);
    res.redirect('/profile');
    return;
  }
  
    res.render("login")
  } catch(err) {
    console.log(err);

  }
})

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
            }
          ]
        }
      ]
    });
    
    const userPosts = userData.get({ plain: true});
    // Render the profile template after fetching data
    res.render("profile", { logged_in: req.session.logged_in, userPosts });
    console.log(userPosts);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send("An error occurred while fetching user data.");
  }
});

router.get('/newPost', async (req, res) => {
  res.render('newPost', {
    logged_in : req.session.logged_in
  });
})



module.exports = router;
