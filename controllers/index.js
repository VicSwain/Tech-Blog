const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// home routes will be using res.render
router.use('/', homeRoutes);
// api route will be using json
router.use('/api', apiRoutes);

module.exports = router;