import React from 'react'

export interface TaskDashboardSummary {
  total: number
  pending: number
  inProgress: number
  completed: number
}

interface TaskDashboardProps {
  summary: TaskDashboardSummary
  title?: string
  subtitle?: string
}

const statCards = [
  { label: 'Total tasks', key: 'total' as const },
  { label: 'Pending', key: 'pending' as const },
  { label: 'In progress', key: 'inProgress' as const },
  { label: 'Completed', key: 'completed' as const },
]

const statusItems = [
  { label: 'Pending', key: 'pending' as const, color: 'bg-amber-400' },
  { label: 'In progress', key: 'inProgress' as const, color: 'bg-sky-500' },
  { label: 'Completed', key: 'completed' as const, color: 'bg-emerald-500' },
]

const TaskDashboard: React.FC<TaskDashboardProps> = ({
  summary,
  title = 'All tasks overview',
  subtitle = 'See all tasks with owner names, statuses, and a quick status breakdown.',
}) => {
  const statusPercent = (count: number) => {
    return summary.total ? Math.round((count / summary.total) * 100) : 0
  }

  return (
    <section className="space-y-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-3 md:p-8 shadow-sm shadow-slate-200/40">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {summary[card.key]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/20">
          <p className="text-sm font-semibold text-slate-700">Task status distribution</p>
          <div className="mt-4 space-y-4">
            {statusItems.map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{item.label}</span>
                  <span>{statusPercent(summary[item.key])}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${statusPercent(summary[item.key])}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </section>
  )
}

export default TaskDashboard
