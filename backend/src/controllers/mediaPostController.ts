import { NextFunction, Request, Response } from "express";
import MediaPost, { IMedia } from "../models/MediaPost";
import { readFileSync } from "fs";
import path from "path";
import { Document } from "mongoose";

export const getMediaPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mediaPosts = await MediaPost.find();

  res.status(200).json({
    success: true,
    mediaPosts,
  });
};

export const postMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    res.json({
      success: "false",
      message: "You must provide a file",
    });
  } else {
    const mediaObj: IMedia = {
      description: req.body.description,
      image: req.file.buffer,
      tags: req.body.tags,
      user: req.body.user,
    };

    MediaPost.create(mediaObj).then((value) => {
      console.log(value);
    });
  }
};
