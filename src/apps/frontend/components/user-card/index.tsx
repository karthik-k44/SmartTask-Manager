import React from 'react'
import type { User } from '../../types'
import { Trash2 } from 'lucide-react'

interface UserCardsProps {
  user: User
  setIsOpen: (isOpen: boolean) => void
  setDeletionId: (id: string) => void
}
const UserCards: React.FC<UserCardsProps> = ({ user, setIsOpen, setDeletionId }) => {
  const handleDelete = () => {
    setIsOpen(true)
    setDeletionId(user._id)
  }
  return (
    <article
      className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30"
    >
      <div className="flex gap-4 flex-row justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
            {user.role}
          </p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">
            {user.name}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{user.email}</p>
        </div>

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete user"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-2 cursor-pointer"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">User ID</p>
          <p className="mt-2 break-all text-sm font-semibold text-slate-900">
            {user._id}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Role</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {user.role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default UserCards
