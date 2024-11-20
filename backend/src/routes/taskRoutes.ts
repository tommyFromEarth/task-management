import express from 'express';
import { createTask, getUserTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { asyncHandler } from '../utils/asyncHandlers';
const router = express.Router();

router.post('/tasks', asyncHandler(authMiddleware), asyncHandler(createTask));
router.get('/tasks', asyncHandler(authMiddleware), asyncHandler(getUserTasks));
router.put('/tasks/:taskId', asyncHandler(authMiddleware), asyncHandler(updateTask));
router.delete('/tasks/:taskId', asyncHandler(authMiddleware), asyncHandler(deleteTask));

export default router;
