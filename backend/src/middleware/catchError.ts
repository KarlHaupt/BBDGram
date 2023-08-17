import { NextFunction, Response, Request } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;

    let error = { ...err };

    error.message = err.message;

    //Wrong Mongoose objectID Error
    if(err.name === 'CastError') {
        const message = `Resource now found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose Validation Error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value: any) => value.message);
        error = new ErrorHandler(message[0], 400);
    }

    //Handling Mongoose duplicate errors
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error'
    });
}