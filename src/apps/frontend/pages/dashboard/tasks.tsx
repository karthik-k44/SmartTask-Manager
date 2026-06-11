
import { useEffect } from 'react';
import { GetUserTasks } from '../../redux/action';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import Button from '../../components/button';
import { ButtonKind, ButtonType } from '../../types/button';
import { TaskStatus } from '../../types/user-tasks';

const statusStyles: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'bg-amber-100 text-amber-700',
  [TaskStatus.IN_PROGRESS]: 'bg-sky-100 text-sky-700',
  [TaskStatus.COMPLETED]: 'bg-emerald-100 text-emerald-700',
};

const Tasks = () => {
  const dispatch = useAppDispatch();
  const getUserTaskData = useAppSelector((state) => state.userTask.getUserTaskData);

  useEffect(() => {
    dispatch(GetUserTasks());
  }, [dispatch]);

  return (
    <div className="m-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Your tasks</h1>
          <p className="mt-2 text-sm text-slate-500">All tasks created by you appear here with edit and delete actions.</p>
        </div>
        <div className="max-w-xs">
          <Button kind={ButtonKind.PRIMARY} type={ButtonType.BUTTON}>
            Add new task
          </Button>
        </div>
      </div>

      {getUserTaskData?.length ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {getUserTaskData.map((task) => {
            const dueDate = new Date(task.taskDueDate).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article key={task.taskId} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{task.taskStatus.replace('_', ' ')}</p>
                    <h2 className="mt-3 text-xl font-semibold text-slate-900">{task.taskName}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{task.taskDescription}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold ${statusStyles[task.taskStatus]}`}>
                    {task.taskStatus.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-600">
                    <p className="font-medium text-slate-900">Due date</p>
                    <p className="mt-1">{dueDate}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button kind={ButtonKind.DISCARD} type={ButtonType.BUTTON}>
                      Edit
                    </Button>
                    <Button kind={ButtonKind.DELETE} type={ButtonType.BUTTON}>
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-200/30">
          <p className="text-lg font-semibold text-slate-900">No tasks yet</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">Create a task to see it listed here in a clean card layout.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
