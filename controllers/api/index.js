const router = require('express').Router();
const userRoutes = require('./userRoutes');
router.use((req,res, next) => {
    console.log("+++++++++++++==+++++++++++= NEW API ROUTE HIT++=++++++==++++++=+=+=++++++++++++")
    next()
})

router.use('/users', userRoutes);

module.exports = router;