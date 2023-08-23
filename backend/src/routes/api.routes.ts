import express, { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../middleware/authentication.middleware';

const apiRouter: Router = express.Router();

apiRouter.get("/api/getUserEmail", ensureAuthenticated, (req: Request, res: Response) => {
  console.log(res.getHeader('email'))
  res.json({
      email: res.getHeader('email')
    }
  )
});

export default apiRouter;
