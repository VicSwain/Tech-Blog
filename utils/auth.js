const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.resdirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;