import express from 'express';
import { UserTaskController } from './user-task-controller';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';

const router = express.Router();

router.post('/', AuthMiddleware, UserTaskController.createUserTask);
router.delete('/:id', AuthMiddleware, UserTaskController.deleteUserTask);
router.put('/:id', AuthMiddleware, UserTaskController.updateUserTask);
router.get('/', AuthMiddleware, UserTaskController.getUserTasks);

export default router;