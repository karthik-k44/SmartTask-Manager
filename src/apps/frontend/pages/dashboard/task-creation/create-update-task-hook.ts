import { useAppDispatch } from "../../../redux/hook";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { TaskStatus } from "../../../types/user-tasks";
import type { UserTaskResponse } from "../../../types";
import { CreateUserTask, GetUserTasks, UpdateUserTask } from "../../../redux/reducer/user-tasks/action";

interface CreateAndUpdateTaskFormHookProps {
  task?: UserTaskResponse;
  onSuccess: () => void;
  userId: string;
}

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
    if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
    ) {
        return (error as { message: string }).message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallbackMessage;
};

const CreateAndUpdateTaskFormHook = ({ task, onSuccess, userId }: CreateAndUpdateTaskFormHookProps) => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            userId: userId || '',
            taskName: task?.taskName || '',
            taskDescription: task?.taskDescription || '',
            taskStatus: task?.taskStatus || TaskStatus.PENDING,
            taskDueDate: task?.taskDueDate ? new Date(task.taskDueDate).toISOString().split('T')[0] : '',
        },

        validationSchema: Yup.object({
            taskName: Yup.string().required('Task name is required'),
            taskDescription: Yup.string().required('Task description is required'),
            taskDueDate: Yup.date().required('Due date is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (task?.taskId) {
                    await dispatch(UpdateUserTask({
                        id: task.taskId,
                        params: {
                            taskName: values.taskName,
                            taskDescription: values.taskDescription,
                            taskStatus: values.taskStatus as TaskStatus,
                            taskDueDate: new Date(values.taskDueDate)
                        }
                    })).unwrap();
                    toast.success('Task updated successfully');
                } else {
                    await dispatch(CreateUserTask({
                        userId: values.userId,
                        taskName: values.taskName,
                        taskDescription: values.taskDescription,
                        taskStatus: values.taskStatus as TaskStatus,
                        taskDueDate: new Date(values.taskDueDate)
                    })).unwrap();
                    toast.success('Task created successfully');
                }

                dispatch(GetUserTasks());
                formik.resetForm();
                onSuccess();
            } catch (error) {
                toast.error(
                    getErrorMessage(
                        error,
                        task?.taskId ? 'Unable to update task' : 'Unable to create task',
                    ),
                );
            }
        },
    });

    return {
        formik,
    };
}

export default CreateAndUpdateTaskFormHook;
