import mongoose from "mongoose";
import { TaskStatus } from "../types";

export const CreateUserTaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  taskName:{
    type: String,
    required: true,
  },
  taskDescription:{
    type: String,
    required: true,
  },
  taskStatus:{
    type: String,
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  },
  taskDueDate:{
    type: Date,
  },
})

const UserTaskModel = mongoose.model("UserTask", CreateUserTaskSchema);

export default UserTaskModel;