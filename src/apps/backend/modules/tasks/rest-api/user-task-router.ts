import express from 'express';
import { UserTaskController } from './user-task-controller';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { PermissionMiddleware } from '../../../middlewares/permission-middleware';
import { UserRole } from '../../users/types';

const router = express.Router();

router.post('/', AuthMiddleware, UserTaskController.createUserTask);
router.delete('/:id', AuthMiddleware, UserTaskController.deleteUserTask);
router.patch('/:id', AuthMiddleware, UserTaskController.updateUserTask);
router.get('/', AuthMiddleware, UserTaskController.getUserTasks);
router.get('/all', AuthMiddleware, PermissionMiddleware(UserRole.ADMIN), UserTaskController.getAllTasks);

export default router;