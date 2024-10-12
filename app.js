const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const questionRoutes = require('./routes/question');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const session = require('express-session');
const passport = require('passport');
const connectFlash = require('connect-flash');
const dotenv = require('dotenv');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
app.set('view engine','ejs');
app.engine('ejs', ejsMate);
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
// Cấu hình để phục vụ file tĩnh
app.use(express.static('public'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'views'));
app.use(methodOverride('_method'));
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
app.use('/user/courses', courseRoutes)
app.use('/user/questions', questionRoutes)




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