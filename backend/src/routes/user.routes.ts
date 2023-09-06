import { Router } from "express";
import { getUserByEmail, saveUser } from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/user/byEmail", getUserByEmail);

userRouter.post("/user/save", saveUser);

