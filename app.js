const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const session = require('express-session');
const passport = require('passport');
const connectFlash = require('connect-flash');
const dotenv = require('dotenv');

app.set('view engine','ejs');
app.set('views','./views');
const PORT = process.env.PORT || 5000;
// Load Config
dotenv.config();

// Passport config
require('./config/passport')(passport);

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Middleware
//chuyển dòng json thành object javascript để dùng trong route
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
// Sử dụng middleware để phân tích dữ liệu URL-encoded
app.use(express.urlencoded({ extended: true }));
// Use cookie-parser middleware
app.use(cookieParser());
// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect flash
app.use(connectFlash());

// Routes
app.get('/',(req,res)=>{
  res.render('home');
})
app.use('/api', authRoutes);
app.use('/user', userRoutes);

//ghi thời gian
app.use((req,res,next)=>{
  console.log('Time:',Date.now());
  next();
})
//Sai link
app.use((req,res,next)=>{
  res.status(404).render('404');
  next();
})
// Khởi động server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));