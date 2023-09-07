//node imports
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

//custom imports
import { connectDatabase } from './config/connectDatabase';
import { errorMiddleware } from './middleware/catchError';
import { mediaRouter } from './routes/mediaPost.routes';
import { userRouter } from './routes/user.routes';
import apiRouter from './routes/api.routes';

const app: Express = express();
const cors = require('cors');

//Connecting to database
connectDatabase();

app.use(bodyParser.json({limit:'50mb'}));
app.use(cors());

// CONTROLLERS
app.use(mediaRouter);
app.use(userRouter);
app.use(apiRouter);

app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});