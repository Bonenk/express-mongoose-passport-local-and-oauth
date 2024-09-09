import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Local authentication routes
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // Authentication failed
      req.flash('error_msg', info.message || 'Invalid email or password');
      return res.redirect('/login');
    }

    // Check if the user has a Google account
    if (user.googleId) {
      req.flash('error_msg', 'This account is registered with Google. Please use Google Sign-In.');
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success_msg', 'You have successfully logged in');
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];

  // Validation checks
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('register', { errors, username, email });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    
    if (existingUser) {
      // Check if the email is already registered with Google or other providers
      if (existingUser.googleId) {
        req.flash('error_msg', 'This email is already registered with Google. Please use Google Sign-In.');
      } else {
        req.flash('error_msg', 'This email is already registered. Please login or use a different email.');
      }
      return res.redirect('/register');
    }

    // If we reach here, no existing user was found, so create a new one
    const newUser = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');

  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred during registration. Please try again.');
    res.redirect('/register');
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

export default router;