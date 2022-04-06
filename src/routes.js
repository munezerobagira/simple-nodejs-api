import express from "express";
import {
  getPosts,
  singlePost,
  createPost,
  updatePost,
  deletePost,
} from "./controller/postController";
const router = express.Router();
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.get("/posts/:id", singlePost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
export default router;
