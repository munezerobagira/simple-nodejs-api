import express from 'express';

import UserController from '../controllers/UserController';
import isLoggedIn from '../middlewares/isLoggedIn';

const router = express.Router();
router.post('/auth/signup', UserController.signup);
router.post('/auth/signin', UserController.signin);
router.get('/profile', isLoggedIn, UserController.getUser);
router.patch('/profile', isLoggedIn, UserController.updateUser);

export default router;
