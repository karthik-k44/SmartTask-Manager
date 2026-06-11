import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { UserTaskResponse } from '../../types';

interface TaskCardProps {
  task: UserTaskResponse;
  onEdit?: () => void;
  setDeletionId: (id: string) => void;
  setDeleteModalOpen: (isOpen: boolean) => void;
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  IN_PROGRESS: 'bg-sky-100 text-sky-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  setDeletionId,
  setDeleteModalOpen,
}) => {
  const dueDate = new Date(task.taskDueDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = () => {
    setDeleteModalOpen(true);
    setDeletionId(task.taskId);
  };

  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-3 md:p-6 shadow-sm shadow-slate-200/30 transition-all hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            {task.taskName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-2">
            {task.taskDescription}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide ${
            statusStyles[task.taskStatus] || "bg-slate-100 text-slate-700"
          }`}
        >
          {task.taskStatus.replace(/_/g, " ")}
        </span>
      </div>

      <div className="mt-6 flex flex-row justify-between">
        <div className="text-sm text-slate-600">
          <p className="font-medium text-slate-900">Due date</p>
          <p className="mt-1">{dueDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit task"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete task"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
