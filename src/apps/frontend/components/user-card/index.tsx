import React, { useState, useEffect } from 'react'
import type { User } from '../../types'
import { Trash2 } from 'lucide-react'
import { UserStatus, UserRole } from '../../types/user-authentication'

interface UserCardsProps {
  user: User
  setIsOpen: (isOpen: boolean) => void
  setDeletionId: (id: string) => void
  onToggleStatus?: (userId: string, newStatus: any) => void
}
const UserCards: React.FC<UserCardsProps> = ({ user, setIsOpen, setDeletionId, onToggleStatus }) => {
  const [isActive, setIsActive] = useState(user.userStatus === UserStatus.ACTIVE);

  useEffect(() => {
    setIsActive(user.userStatus === UserStatus.ACTIVE);
  }, [user.userStatus]);

  const handleDelete = () => {
    setIsOpen(true)
    setDeletionId(user._id)
  }

  const isAdmin = user.role === UserRole.ADMIN;

  const handleToggle = () => {
    if (isAdmin) return;
    const newStatus = isActive ? UserStatus.INACTIVE : UserStatus.ACTIVE;
    setIsActive(!isActive);
    if (onToggleStatus) {
      onToggleStatus(user._id, newStatus);
    }
  };

  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30 transition-all hover:shadow-md">
      <div className="flex gap-4 flex-row justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              {user.role}
            </p>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">
            {user.name}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{user.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            disabled={isAdmin}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
              isActive ? "bg-emerald-500" : "bg-slate-300"
            } ${isAdmin ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            role="switch"
            aria-checked={isActive}
            aria-label="Toggle user status"
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isActive ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
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
