import multer from "multer";
import { getMediaPosts, postMedia } from "../controllers/mediaPostController";
import { Router } from "express";

export const mediaRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

mediaRouter.get("/media/posts", getMediaPosts);

mediaRouter.post("/media/posts", upload.single("image"), postMedia);
