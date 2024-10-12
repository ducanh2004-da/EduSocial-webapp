// router.get('/', async (req, res) => {
//     res.render('Register');
// });
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const passport = require('passport');
const { auth, isAdmin,ensureAuthenticated } = require('../middleware/authMiddleware'); // Import middleware

const router = express();
// Sử dụng middleware để phân tích dữ liệu URL-encoded
router.use(express.urlencoded({ extended: true }));

router.set('view engine','ejs');
router.set('views','./views');
router.get('/',async (req,res)=>{
    res.render('form');
})
router.post('/register', registerUser);
router.post('/login', loginUser);
// Routes

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/user/courses');
});

// Facebook Auth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/user/courses');
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;

