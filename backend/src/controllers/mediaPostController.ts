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
  res: Response
) => {
  let missing = "The following data is missing: ";
  if (!req.body.description) {
    missing += "Description ";
  }
  if (!req.body.tag) {
    missing += "Tag ";
  }
  if (!req.body.user) {
    missing += "User Email ";
  }
  if (!req.file?.path) {
    missing += "File ";
  }
  if (missing !== "The following data is missing: ") {
    res.json({
      success: "false",
      message: missing,
    });
  } else {
    const img = readFileSync(req.file?.path!);
    const encoded_img = img.toString("base64");
    
    const final_img = {
      data: Buffer.from(encoded_img, "base64"),
      contentType: req.file?.mimetype!
    }

    const mediaObj: IMedia = {
      description: req.body.description,
      image: final_img,
      tag: req.body.tag,
      user: req.body.user,
    };

    MediaPost.create(mediaObj).then((value) => {
      res.json({
        success: "true",
        message: "File Successfully Uploaded!"
      })
    });
  }
};
