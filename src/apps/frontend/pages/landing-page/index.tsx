import {
  Shield,
  Activity,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "../../components/button";
import Navbar from "../../components/navbar";
import { ROUTES } from "../../routes/types";
import { useState } from "react";
import CreateAndLoginForm from "./authentication/create-and-login-form";

const LandingPage = () => {
  const navItems = [
    { value: "features", label: "Features" },
    { value: "security", label: "Security" },
    { value: "analytics", label: "Analytics" },
    { value: "how-it-works", label: "How it works" },
  ];

   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navType: any = "PUBLIC";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      <Navbar
        navType={navType}
        onLoginClick={() => setIsAuthModalOpen(true)}
        navbarItems={navItems as any}
        isActiveNavItem={undefined}
        setIsActiveNavItem={undefined}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-200/70 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-100/70 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-4 py-2 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  Deadline-ready task tracking
                </span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
                SmartTask Manager with{" "}
                <span className="text-primary-600">Role-based Access</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Admins manage users and monitor activity. Users create and
                manage their own tasks—everything is securely authorized and
                fully tracked.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Button onClick={() => (window.location.href = ROUTES.LANDING)}>
                  <div className="flex items-center gap-2">
                    <span>View Features</span>
                    <ArrowRight size={16} />
                  </div>
                </Button>

                <a
                  href="#analytics"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">See Analytics</span>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              <div className="relative rounded-2xl border border-gray-200 bg-white/80 shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary-600/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Authorization</p>
                      <p className="font-bold">Protected APIs + Routes</p>
                    </div>
                  </div>
                  <div className="hidden sm:block rounded-full bg-primary-50 border border-primary-200 px-3 py-1 text-sm font-medium text-primary-700">
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
                        <span className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 px-2.5 py-1 text-xs text-gray-600">
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
      </header>

      {/* Features */}
      <section id="features" className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Everything you need for deadline-grade task management
              </h2>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Role-based access ensures only authorized actions are allowed.
                Activity logs and analytics give admins full visibility.
              </p>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Role-based Access",
                description:
                  "Admins manage users and tasks. Users operate only on their own tasks.",
                icon: Shield,
              },
              {
                title: "Activity Tracking",
                description:
                  "Logins, task creation, updates, and deletions are stored and viewable.",
                icon: Activity,
              },
              {
                title: "Admin Analytics",
                description:
                  "Total users, tasks, completed vs pending—at a glance.",
                icon: BarChart3,
              },
              {
                title: "Task Management",
                description:
                  "Fast CRUD for tasks with secure backend authorization.",
                icon: CheckCircle2,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-primary-600/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security + How it works */}
      <section id="security" className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Protected by RBAC
              </h2>
              <p className="mt-3 text-gray-600">
                Admins get admin-only endpoints and routes. Users get a scoped
                view of only their own tasks. Authorization middleware protects
                everything.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  {
                    k: "Admin endpoints",
                    v: "View all users, delete users, update user status",
                  },
                  {
                    k: "Task monitoring",
                    v: "Admins view all tasks created by users",
                  },
                  {
                    k: "Audit logs",
                    v: "Login + task events stored and tracked",
                  },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="rounded-xl border border-gray-200 bg-white/70 p-4"
                  >
                    <p className="font-semibold">{row.k}</p>
                    <p className="mt-1 text-sm text-gray-600">{row.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="how-it-works"
              className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold">How it works</h3>
              <div className="mt-6 space-y-4">
                {[
                  {
                    step: "01",
                    title: "Authenticate",
                    desc: "Sign in to receive an auth token. Protected routes check token presence.",
                  },
                  {
                    step: "02",
                    title: "Authorize",
                    desc: "Admin-only or user-scoped endpoints are enforced by middleware.",
                  },
                  {
                    step: "03",
                    title: "Track & Analyze",
                    desc: "Activity log records every critical action and enables analytics for admins.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary-600/10 border border-primary-200 flex items-center justify-center font-bold text-primary-700">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-bold">{s.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 p-[1px]">
                <div className="rounded-xl bg-white p-5 sm:p-6">
                  <p className="font-bold">Ready for LevelUp submission</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Tailwind-based responsive landing page UI aligned with your
                    RBAC + activity tracking objective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section id="analytics" className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Admin Analytics
              </h2>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Visual summaries to help admins manage users and assess progress
                instantly.
              </p>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Total Users", value: "—", hint: "admin view" },
              { label: "Total Tasks", value: "—", hint: "all users" },
              { label: "Completed", value: "—", hint: "tracked status" },
              { label: "Pending", value: "—", hint: "queued tasks" },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <div className="h-10 w-10 rounded-xl bg-primary-600/10 border border-primary-200 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <p className="mt-4 text-3xl sm:text-4xl font-extrabold">
                  {card.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{card.hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-primary-50/60 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h3 className="text-xl font-bold">Role-Based UI</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Admin menu only appears for admins, and unauthorized pages are
                  restricted.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = ROUTES.LANDING;
                  }}
                >
                  Explore
                </a>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium"
                >
                  Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SmartTask Manager. RBAC + Activity
              Tracking.
            </p>
            <div className="flex items-center gap-3">
              <a
                className="text-sm text-gray-600 hover:text-gray-900"
                href="#security"
              >
                Security
              </a>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <a
                className="text-sm text-gray-600 hover:text-gray-900"
                href="#analytics"
              >
                Analytics
              </a>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <a
                className="text-sm text-gray-600 hover:text-gray-900"
                href="#features"
              >
                Features
              </a>
            </div>
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
