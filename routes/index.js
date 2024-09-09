import express from "express";

import { forwardAuthenticated, ensureAuthenticated } from "../config/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

// Check if user is already logged in and render login page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Check if user is already logged in and render register page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});

export default router;