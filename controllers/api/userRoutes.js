const router = require('express').Router();
const { User } = require('../../models');
// post route to create a new user
router.post('/', async (req, res) => {
  try {
    // console.log("==================== USER POst ROute: ", req.body)
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    // console.log("===========err: ", err)
    res.status(400).json(err);
  }
});
// post route for a user to login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    // Always return a generic error message for security
    if (!userData) {
      // Return a generic error message to prevent timing attacks
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    // Always return a generic error message for security
    if (!validPassword) {
      // Return a generic error message to prevent timing attacks
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    // Session handling
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      return res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Log the error on the server for debugging purposes
    console.error(err);
    // Return a generic error message to the client
    return res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// post route for the user to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
