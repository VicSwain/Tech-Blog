const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async(req,res)=> {
    console.log("Api route hit!")
    console.log(req.body)
    try {
        const user = await User.create(req.body)
    
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.status(200).json(user);
          });    } catch (error) {
        console.log("Error: ", error)
        res.status(400).json("Couldn't create user!")
    }
    
})

module.exports = router