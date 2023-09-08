import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { ErrorHandler } from "../utils/ErrorHandler";

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    if (!req.query.email) {
      res.status(400).json({
        success: false,
        message: "Please provide an email"
      });
    }

    const response = await User.findOne({ email: req.query.email });

    if (response) {
      res.status(200).json({
        success: true,
        userId: response._id
      })
    } else {
      res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
  } catch(err) {
    console.log(err);
  }
};

export const saveUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.username || !req.body.email) {
        return next(new ErrorHandler('Username and email not found', 400));
    }

    let result = await User.findOne({ email: req.body.email });

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
      })
    } catch(err) {
      console.log(err);
    }
  };