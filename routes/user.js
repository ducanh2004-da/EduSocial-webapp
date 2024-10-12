const express = require('express');
const { auth, isAdmin } = require('../middleware/authMiddleware'); // Import middleware
const router = express.Router();

// Route chỉ dành cho người dùng đã đăng nhập
router.get('/post',auth, (req, res) => {
    // res.json({ msg: `Welcome, ${req.user.id}!` });
    res.render('Post', { user: req.user });
});

// Route dành cho admin
router.get('/admin', auth, isAdmin, (req, res) => {
    res.render('AdminPage', { user: req.user });
});
router.get('/post/create',(req,res)=>{
    res.render('CreatePost');
})
module.exports = router;