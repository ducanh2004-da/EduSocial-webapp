const jwt = require('jsonwebtoken');
const JWT_SECRET = 'regislogToken';

// Middleware xác thực JWT
function auth(req, res, next) {
  // Kiểm tra nếu người dùng đã đăng nhập bằng Google/Facebook OAuth
  if (req.isAuthenticated()) {
    return next(); // Người dùng đã được xác thực qua Passport
  }

  // Kiểm tra token từ cookie khi sử dụng JWT
  const token = req.cookies.jwt; 
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log('Lỗi xác thực JWT:', err.message);
          return res.redirect('/api/'); // Chuyển hướng nếu token không hợp lệ
        } else {
          req.user = decodedToken; // Lưu thông tin người dùng vào req.user
          return next(); // Tiếp tục xử lý
        }
      });
    } catch (error) {
      console.log('Invalid token:', error.message);
      return res.status(400).json({ message: 'Invalid token' });
    }
  } else {
    console.log('No token provided');
    return res.redirect('/api/'); // Chuyển hướng nếu không có token
  }
}

// Middleware phân quyền: chỉ cho phép Admin
function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
}

module.exports = { auth, isAdmin};