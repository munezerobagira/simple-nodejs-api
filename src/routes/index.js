import express from "express";
import PostController from "../controller/PostController";
const router = express.Router();
router.get("/posts", PostController.allPost);
router.post("/posts", PostController.create);
router.get("/posts/:id", PostController.singlePost);
router.patch("/posts/:id", PostController.update);
router.delete("/posts/:id", PostController.delete);
export default router;
