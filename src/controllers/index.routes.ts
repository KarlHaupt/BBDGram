import express, { Request, Response, Router } from 'express';
import path from 'path';
import { ensureAuthenticated } from '../middleware/authentication.middleware';

const indexController: Router = express.Router();

indexController.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/markup/login.html"));
});

indexController.get("/redirect", (req: Request, res: Response) => {
  const obj = JSON.parse(JSON.stringify(req.user));
  res.redirect(`/game?playerName=${obj.displayName}&access_token=${obj.accessToken}`)
})

indexController.get("/game", ensureAuthenticated, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/markup/game.html"));
});

indexController.get("/scores", ensureAuthenticated, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/markup/scores.html"));
});

export default indexController;
