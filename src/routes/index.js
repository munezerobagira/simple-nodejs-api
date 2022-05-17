import express from "express";

import UserController from "../controller/UserController";
import PostController from "../controller/UserController";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = express.Router();
router.post("/auth/signup", UserController.signup);
router.post("/auth/signin", PostController.signin);
router.get("/profile", isLoggedIn, PostController.getUser);
router.patch("/profile", isLoggedIn, PostController.updateUser);

export default router;
