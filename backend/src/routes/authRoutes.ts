import express from 'express';
import { login, register, getUserProfile } from '../controllers/authController';
import { asyncHandler } from '../utils/asyncHandlers';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = express.Router();
router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register)); 
router.get('/profile', asyncHandler(authMiddleware), asyncHandler(getUserProfile)); 

export default router;
