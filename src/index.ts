//node imports
import express, { Express } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

//custom imports
import './config/passport';
import { connectDatabase } from './config/connectDatabase';
import { errorMiddleware } from './middleware/catchError';
import authRouter from './routes/auth.routes';
import { mediaRouter } from './routes/mediaPost.routes';

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
app.use(authRouter);
//app.use(apiController);

app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});