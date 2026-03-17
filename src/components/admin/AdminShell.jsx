"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/news", label: "News & Events" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <aside className="w-full bg-slate-900 px-6 py-8 text-white md:w-72">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
              HR Portal
            </p>
            <h1 className="mt-3 text-2xl font-semibold">Global Enviro Admin</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-sky-500 text-white"
                      : "bg-slate-800/70 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-8 w-full rounded-xl border border-slate-700 px-4 py-3 text-left text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
          >
            Sign out
          </button>
        </aside>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
