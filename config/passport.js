const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
          // Tìm người dùng đã tồn tại với googleId
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            // Nếu người dùng chưa tồn tại, tạo mới
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id
            });
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      })
  );

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/facebook/callback',
      profileFields: ['id', 'displayName', 'emails']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          // Nếu người dùng chưa tồn tại, tạo mới
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            facebookId: profile.id
          });
          await user.save();
        }
        return done(null, user);
        } catch (error) {
          return done(error, false);
        }
    })
  );

  // Sửa phần serializeUser và deserializeUser để dùng async/await
  passport.serializeUser((user, done) => {
    done(null, user.id); // Lưu ID vào session
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Sử dụng async/await để tìm user bằng ID
      done(null, user); // Trả về người dùng
    } catch (error) {
      done(error, null); // Xử lý lỗi
    }
  });
};