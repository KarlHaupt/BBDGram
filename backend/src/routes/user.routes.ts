import { Router } from "express";
import { saveUser } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/user/save", saveUser);

