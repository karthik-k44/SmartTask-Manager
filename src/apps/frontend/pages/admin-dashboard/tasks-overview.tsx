import { useEffect, useMemo } from 'react';
import { GetAllUsers } from '../../redux/action';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { GetAllTasks } from '../../redux/reducer/user-tasks/action';
import { TaskStatus } from '../../types/user-tasks';
import TaskDashboard from './tasks/task-dashboard';
import TaskTable from './tasks/task-table';

const TasksOverview = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.authUser.getAllUsersSuccess);
  const tasks = useAppSelector((state) => state.userTask.getAllTasksData);

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

  const taskSummary = useMemo(() => {
    const summary = {
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
      <TaskTable tasks={tasks? tasks : []} usersById={usersById} />
    </div>
  );
};

export default TasksOverview;
