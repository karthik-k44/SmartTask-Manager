import { useEffect, useMemo, useState } from 'react';
import { GetAllUsers } from '../../redux/action';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { DeleteUserTask, GetAllTasks } from '../../redux/reducer/user-tasks/action';
import { TaskStatus } from '../../types/user-tasks';
import TaskDashboard from './tasks/task-dashboard';
import TaskTable from './tasks/task-table';
import { DeletionPopup } from '../../components';
import toast from 'react-hot-toast';

const TasksOverview = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.authUser.getAllUsersSuccess);
  const tasks = useAppSelector((state) => state.userTask.getAllTasksData);

  const [deletionTaskId, setDeletionTaskId] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(GetAllTasks());
  }, [dispatch]);

  const usersById = useMemo(
    () =>
      users?.reduce<Record<string, typeof users[0]>>((map, user) => {
        map[user._id] = user;
        return map;
      }, {}),
    [users],
  );

  const handleDeleteUser = async () => {
    if (!deletionTaskId) {
      return;
    }
    try {
      await dispatch(DeleteUserTask(deletionTaskId)).unwrap();
      toast.success("Task deleted successfully");
      setDeletionTaskId("");
      await dispatch(GetAllTasks());
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

  const taskSummary = useMemo(() => {
    const summary = {
      totalUsers: users?.length ?? 0,
      total: tasks?.length ?? 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
    };

    tasks?.forEach((task) => {
      if (task.taskStatus === TaskStatus.PENDING) summary.pending += 1;
      if (task.taskStatus === TaskStatus.IN_PROGRESS) summary.inProgress += 1;
      if (task.taskStatus === TaskStatus.COMPLETED) summary.completed += 1;
    });

    return summary;
  }, [tasks]);

  return (
    <div className="space-y-8">
      <TaskDashboard summary={taskSummary} />
      <TaskTable
        tasks={tasks ? tasks : []}
        usersById={usersById}
        setDeletionTaskId={setDeletionTaskId}
        setDeleteModalOpen={setDeleteModalOpen}
      />

      <DeletionPopup
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default TasksOverview;
