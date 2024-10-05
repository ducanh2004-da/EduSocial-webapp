const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'regislogToken';
const maxAge = 10*60;

//handle Register error:
const handleRegisErrors = (err) =>{
  console.log(err.message,err.code);
  let errors = {email: '', password: ''};
  if(err.code === 11000){
    errors.email = 'Email đã tồn tại';
    return errors;
  }
  else{
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
    })
  }
  return errors;
  }
}
//handle Login error:
const handleLogErrors = (err) =>{
  console.log(err.message,err.code);
  let errors = {email: '', password: ''};
  if(err.code === 11000){
    errors.email = 'Email đã tồn tại';
    return errors;
  }
  else{
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
    })
  }
  return errors;
  }
}
//create token
const createToken = (id)=>{
  //create token with signature, the header automatically get applied
  return jwt.sign({ id },JWT_SECRET,{
    expiresIn:maxAge
  });
}

// Đăng ký
module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge*10});
    res.status(201).json({ message: 'Đăng ký thành công', user: user._id });
  } catch (error) {
    const errors = handleRegisErrors(error);
    if(errors.email=='Hãy nhập email' || errors.email=='Email đã tồn tại'){
      res.status(400).json({message: `Lỗi đăng ký: ${errors.email}`, errors });
    }
    else if(errors.password=='Hãy nhập password'){
      res.status(400).json({message: `Lỗi đăng ký: ${errors.password}`, errors });
    }
    else{
      res.status(400).json({message: `Lỗi đăng ký: ${errors.message}`, errors });
    }
    console.log(req.body);
    console.log(errors);
}
};

// Đăng nhập
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email,password);
    const token = createToken(user._id);
    res.cookie('jwt',token,{ httpOnly:true,maxAge:maxAge*1000 });
    res.status(200).json({ user: user._id, message: 'Đăng nhập thành công' });
  } catch (error) {
    const errors = handleLogErrors(error);
    res.status(400).json({ message: `Lỗi đăng nhập: ${error.message}`, error });
    console.log(error);
  }
};