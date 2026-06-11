import React from 'react'
import type { TaskStatus, User, UserTaskResponse } from '../../../types'

interface TaskTableProps {
  tasks: UserTaskResponse[]
  usersById?: Record<string, User>
  noDataTitle?: string
  noDataMessage?: string
}

const statusStyles: Record<TaskStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  IN_PROGRESS: 'bg-sky-100 text-sky-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
}

const formatStatus = (status: TaskStatus) => status.replace(/_/g, ' ')

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  usersById,
  noDataTitle = 'No tasks available',
  noDataMessage = 'All tasks will appear here once the data is loaded.',
}) => {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/30">
      {tasks.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Task</th>
                <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                <th className="px-6 py-4 font-medium text-slate-600">Owner</th>
                <th className="px-6 py-4 font-medium text-slate-600">Email</th>
                <th className="px-6 py-4 font-medium text-slate-600">Due date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const owner = usersById?.[task.userId]
                return (
                  <tr key={task.taskId} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-5 align-top">
                      <div className="font-semibold text-slate-900">{task.taskName}</div>
                      <div className="mt-2 text-sm text-slate-600">{task.taskDescription}</div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusStyles[task.taskStatus]}`}
                      >
                        {formatStatus(task.taskStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top text-slate-900">{owner?.name ?? 'Unknown'}</td>
                    <td className="px-6 py-5 align-top text-slate-600">{owner?.email ?? 'Unknown'}</td>
                    <td className="px-6 py-5 align-top text-slate-900">
                      {new Date(task.taskDueDate).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-900">{noDataTitle}</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{noDataMessage}</p>
        </div>
      )}
    </div>
  )
}

export default TaskTable
