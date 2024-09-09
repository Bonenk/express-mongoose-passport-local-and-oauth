import express from "express";
import mongoose from "mongoose";
import nunjucks from "nunjucks";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import authRoutes from "./routes/auth.js";

import dotenv from 'dotenv';
dotenv.config();

import MongoDBStore from 'connect-mongodb-session';


// Create a new MongoDBStore instance
const MongoDBStoreInstance = MongoDBStore(session);

const store = new MongoDBStoreInstance({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});

// Handle errors
store.on('error', function(error) {
  console.error(error);
});

const app = express();

app.use(express.urlencoded({ extended: true }));

function setUpNunjucks() {
  let env = nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });
}

setUpNunjucks();
app.set("view engine", "html");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Express session Config
app.use(
  session({
    secret: "jashbd*(&(*7q3wjkkjahdsk",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    },
    resave: true,
    saveUninitialized: true,
    store: store
  })
);

// Passport Configuration and middelware
import configurePassport from './config/passport.js';
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect flash messages
app.use(flash());

// register middleware to log flash
app.use((req, res, next) => {
  const getFlashMessage = (key) => {
    const messages = req.flash(key);
    return messages.length > 0 ? messages[0] : null;
  };
  res.locals.success_msg = getFlashMessage('success_msg');
  res.locals.error_msg = getFlashMessage('error_msg');
  res.locals.error = getFlashMessage('error');
  res.locals.user = req.user || null;
  next();
});

import routes from "./routes/index.js";
app.use("/", routes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
