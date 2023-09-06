import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { ErrorHandler } from "../utils/ErrorHandler";

export const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.email) {
        return next(new ErrorHandler('Username and email not found', 400));
    }

    const result = await User.findOne({ email: req.body.email });

    if(result != null) {
      return res.json({
        success: true,
        user: result
      });
    }

    const user: IUser = {
        username: req.body.username,
        email: req.body.email
      };
  
      User.create(user).then((value) => {
        console.log('value: ', value);
        res.json({
          success: true,
          user: value
        })
      });
  };