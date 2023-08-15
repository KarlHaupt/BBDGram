import express, { Express } from 'express';
import dotenv from 'dotenv';
import authController from './controllers/auth.routes';
//import apiController from './controllers/api.routes';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config();
import './config/passport';
import { connectDatabase } from './config/connectDatabase';
import { mediaRouter } from './routes/mediaPost';
import { errorMiddleware } from './middleware/catchError';


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

//Connecting to database
connectDatabase();


app.use(bodyParser.json());

// VIEWS
//app.use(express.static(path.join(__dirname, "..", "client", "markup")));



// CONTROLLERS
app.use(mediaRouter);
app.use(authController);
//app.use(apiController);

app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});