const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validation');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false
  },
  facebookId: {
    type: String,
    required: false
  },
  name: { 
    type: String, 
    required: [true,'Hãy nhập username'] 
  },
  email: { 
    type: String, 
    // Email chỉ yêu cầu khi người dùng không đăng ký qua Google
    required: function() {
      return !this.googleId;
    },
    unique: true,
    validation: [isEmail, 'Hãy nhập email hợp lệ'] 
  },
  password: { 
    type: String, 
    // Mật khẩu chỉ yêu cầu khi người dùng không đăng ký qua Google
    required: function() {
      return !this.googleId;
    },
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
// Mã hóa mật khẩu trước khi lưu vào database
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//Static method to login user
UserSchema.statics.login = async function(email,password){
  const user = await User.findOne({ email });
    if (user){ 
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch){
        return user;
      }
      throw Error('Nhập Sai Mật Khẩu');
    }
    throw Error('Nhập Sai email');
}
const User = mongoose.model('User', UserSchema);
module.exports = User;