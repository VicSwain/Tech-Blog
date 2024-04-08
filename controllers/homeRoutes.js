const router = require("express").Router();
const { User, Comment, Post } = require("../models");
const withAuth = require('../utils/auth');
//RES.RENDER()

//get route to home page
//req working
router.get("/", async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      // look in pgAdmin at erd of db
      include: [
        { model: Comment, include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
    });
    const posts = userPostData.map(post => post.get({plain:true}))
    // console.log("=========================================")
    // console.log(posts)
    // console.log("=========================================")

    res.render("homepage", {posts: posts, logged_in: req.session.logged_in});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req,res) => {
    const userPostData = await Post.findByPk(req.params.id, {      include: [
        { model: Comment, include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] }, 
      ],
      
})

    const post = userPostData.get({plain: true})
    console.log(post);
    console.log(post.user_id);
    console.log(req.session.user_id);
    let postIsUser;
    if(post.user_id === req.session.user_id) {
       postIsUser = true;
    } else {
       postIsUser = false;
    }
    console.log(postIsUser);
    res.render("singlePost", {post, postIsUser, logged_in: req.session.logged_in});
    
})

router.get("/signup", async (req, res) => {
  res.render("signUp");
});
// localhost:3001/poop

router.get('/login', async (req,res) => {
      // If the user is already logged in, redirect the request to another route
 try {
      if (req.session.logged_in) {
        // console.log(req.session.user_id);
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
              include: [
                {
                  model: User,
                  attributes: ['username']
                }
              ]
            }
          ]
        }
      ]
    });

    const userPosts = userData.get({ plain: true});
    console.log(userPosts.posts[0].comments);
    // Render the profile template after fetching data
    res.render("profile", { logged_in: req.session.logged_in, userPosts });
    // console.log(userData);
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

router.get('/update/:id', async (req,res)=> {
  const updateData = await Post.findByPk(req.params.id, {
    include: {model: Comment}
  });
  const post = updateData.get({plain: true });
  console.log(post);
  res.render('update', {post, id: req.params.id, logged_in: req.session.logged_in, user_id: req.session.user_id});
})




module.exports = router;
