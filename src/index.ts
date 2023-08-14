import express, { Express } from 'express';
import dotenv from 'dotenv';
//import indexController from './controllers/index.routes';
import authController from './controllers/auth.routes';
//import apiController from './controllers/api.routes';
import path from 'path';
import bodyParser from 'body-parser';
dotenv.config();
import './config/passport';


const app: Express = express();
const passport = require('passport');
const session = require('express-session');

// SESSIONS
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());


app.use(bodyParser.json());

// VIEWS
//app.use(express.static(path.join(__dirname, "..", "client", "markup")));



// CONTROLLERS
//app.use(indexController);
app.use(authController);
//app.use(apiController);


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});