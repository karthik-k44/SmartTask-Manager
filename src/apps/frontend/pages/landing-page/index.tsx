import {
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "../../components/button";
import Navbar from "../../components/navbar";
import { useState } from "react";
import CreateAndLoginForm from "./authentication/create-and-login-form";

const LandingPage = () => {
  // Simplified navigation for a single-screen layout
  const navItems: any[] = [];
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navType: any = "PUBLIC";

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      <Navbar
        navType={navType}
        onLoginClick={() => setIsAuthModalOpen(true)}
        navbarItems={navItems as any}
        isActiveNavItem={undefined}
        setIsActiveNavItem={undefined}
      />

      <div className="h-16" />

      <main className="relative flex flex-grow items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-200/70 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-100/70 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-4 py-2 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  Deadline-ready task tracking
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                SmartTask Manager with{" "}
                <span className="text-primary-600">Role-based Access</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Admins manage users and monitor activity. Users create and
                manage their own tasks—everything is securely authorized and
                fully tracked.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  <div className="flex items-center gap-2">
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </div>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white/70 p-4">
                  <p className="text-sm text-gray-500">Role Security</p>
                  <p className="mt-1 font-bold">Admin & User</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white/70 p-4">
                  <p className="text-sm text-gray-500">Activity Logs</p>
                  <p className="mt-1 font-bold">Login + Task Ops</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white/70 p-4">
                  <p className="text-sm text-gray-500">Analytics</p>
                  <p className="mt-1 font-bold">Completed vs Pending</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/70 via-primary-100/50 to-transparent blur-2xl" />
              <div className="relative rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/10">
                      <Shield className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Authorization</p>
                      <p className="font-bold">Protected APIs + Routes</p>
                    </div>
                  </div>
                  <div className="hidden rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 sm:block">
                    Live-ready
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      t: "Admin",
                      d: "View all users, manage status, delete tasks",
                    },
                    { t: "User", d: "Create/update/delete own tasks only" },
                    {
                      t: "Audit",
                      d: "Login, create, update, delete events tracked",
                    },
                  ].map((row) => (
                    <div
                      key={row.t}
                      className="rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{row.t}</p>
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                          RBAC
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{row.d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" />
                  <span>Clean, responsive UI built with Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-auto py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SmartTask Manager. RBAC + Activity
              Tracking.
            </p>
          </div>
        </div>
      </footer>
      <CreateAndLoginForm
        isOpen={isAuthModalOpen}
        setIsOpen={setIsAuthModalOpen}
      />
    </div>
  );
};

export default LandingPage;
