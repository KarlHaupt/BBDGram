import { NextFunction, Request, Response } from "express";
import MediaPost from "../models/MediaPost";

export const getMediaPost = async (req: Request, res: Response, next: NextFunction) => {
    const mediaPosts = await MediaPost.find();

    res.status(200).json({
        success: true,
        mediaPosts
    })
};