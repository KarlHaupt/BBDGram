import express, { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../middleware/authentication.middleware';
import User from '../models/User';

const apiRouter: Router = express.Router();

apiRouter.get("/api/getUserEmail", ensureAuthenticated, (req: Request, res: Response) => {
  console.log(res.getHeader('email'))
  res.json({
      email: res.getHeader('email')
    }
  )
});

apiRouter.put("/api/user", async (req: Request, res: Response) => {
  const response = await User.updateOne(
    { email: res.getHeader('email') },
    { username: req.body.username }
  )

  if (response.acknowledged) {
    res.status(200).json({
      success: true,
      message: "Successfully updated"
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      response
    })
  }
  
})

export default apiRouter;
