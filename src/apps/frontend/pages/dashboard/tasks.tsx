
import { useEffect, useState } from 'react';
import { DeleteUserTask, GetUserTasks } from '../../redux/action';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import Button from '../../components/button';
import { ButtonKind, ButtonType } from '../../types/button';
import TaskCard from '../../components/task-card';
import CreateAndUpdateTaskForm from './task-creation/create-update-task-form';
import { DeletionPopup } from '../../components';
import toast from 'react-hot-toast';
import { GetAllTasks } from '../../redux/reducer/user-tasks/action';
import type { UserTaskResponse } from '../../types';


const Tasks = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [deletionId, setDeletionId] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<UserTaskResponse | undefined>(undefined);
  const getUserTaskData = useAppSelector((state) => state.userTask.getUserTaskData);


  useEffect(() => {
    dispatch(GetUserTasks());
  }, [dispatch]);

  const handleDeleteTask = async () => {
    if (!deletionId) {
      return;
    }
    try {
      await dispatch(DeleteUserTask(deletionId)).unwrap();
      toast.success("Task deleted successfully");
      setDeletionId("");
      await dispatch(GetUserTasks());
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "Unable to delete task";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Your tasks</h1>
          <p className="mt-2 text-sm text-slate-500">
            All tasks created by you appear here with edit and delete actions.
          </p>
        </div>
        <div className="max-w-xs">
          <Button
            kind={ButtonKind.PRIMARY}
            type={ButtonType.BUTTON}
            onClick={() => {
              setSelectedTask(undefined);
              setIsOpen(true);
            }}
          >
            Add new task
          </Button>
        </div>
      </div>

      {getUserTaskData?.length ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {getUserTaskData.map((task) => {
            return (
              <TaskCard
                key={task.taskId}
                task={task}
                onEdit={() => {
                  setSelectedTask(task);
                  setIsOpen(true);
                }}
                setDeletionId={setDeletionId}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-200/30">
          <p className="text-lg font-semibold text-slate-900">No tasks yet</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create a task to see it listed here in a clean card layout.
          </p>
        </div>
      )}
      <CreateAndUpdateTaskForm isOpen={isOpen} setIsOpen={setIsOpen} task={selectedTask} />
      <DeletionPopup
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        onConfirm={handleDeleteTask}
        title="Are you sure you want to delete this task"
      />
    </div>
  );
};

export default Tasks;
