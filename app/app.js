// Third Party Modules
import express from "express";
import cookieParser from "cookie-parser";
import logger from 'morgan';
import session from "express-session";

// ES Modules fix for __dirname 
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Auth step 1 - import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// Auth step2 - define our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth step3 - import the user model
import User from './models/user.js';
// Import Mongoose Module
import mongoose from 'mongoose';


// Configuration Module
import { MongoURI, Secret } from "../config/config.js";

// Import Routes
import indexRouter from './routes/index.route.server.js';
import movieRouter from './routes/movies.route.server.js';
import authRouter from './routes/auth.route.server.js';

// instantiate app-server
const app = express();

// Complete the dB Copnfiguration
mongoose.connect(MongoURI);
const db = mongoose.connection;

//Listen for connection success or error
db.on('open', () => console.log("Connected to MongoDB"));
db.on('error', () => console.log("Mongo connection error"));

// setup ViewEngine EJS
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '../public')));

// Auth Step4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));

// Auth step5 - Setup the flash messages
app.use(flash());

// Auth step 6 - Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Auth step 7 - Implement the Auth strategy
passport.use(User.createStrategy());

// Auth step 8 - Setup Serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Use Routes
app.use('/', indexRouter);
app.use('/', movieRouter);
app.use('/', authRouter);

// // run app
// app.listen(3000);

// console.log('Server running at http://localhost:3000');

export default app;
