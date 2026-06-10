import type {Request, Response } from 'express';
import { UserTaskServices } from '../user-task-services';
import type { AuthenticatedRequest } from '../../../middlewares/types';
import type { CreateUserTaskParams } from '../types';

export class UserTaskController {
  public static createUserTask = async (req: Request, res: Response) => {
    try {
      const request = req as unknown as AuthenticatedRequest;
      const userId = request.user?._id;
      const body = req.body as CreateUserTaskParams;

      if(!userId)
      {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const task = await UserTaskServices.createUserTask({ ...body, userId });
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  public static deleteUserTask = async (req: Request, res: Response) => {
    try {
      const taskId  = String(req.params.id).replace(/^:/, '');
      console.log("Received Task ID:", taskId);
      const result = await UserTaskServices.deleteUserTask(taskId);
      return res.status(200).json({ message: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public static updateUserTask = async (req: Request, res: Response) => {
    try {
      const taskId  = String(req.params.id).replace(/^:/, '');
      const body = req.body;
      const updatedTask = await UserTaskServices.updateUserTask(taskId, body);
      return res.status(200).json(updatedTask);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public static getUserTasks = async (req: Request, res: Response) => {
    try {
      const request = req as unknown as AuthenticatedRequest;
      const userId = request.user?._id;

      if(!userId)
      {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const tasks = await UserTaskServices.getUserTasks(userId);
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}