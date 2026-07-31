"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

const roleStyles = {
  USER: "bg-blue-100 text-blue-700",
  ADMIN: "bg-purple-100 text-purple-700",
} as const;

type Role = "USER" | "ADMIN";

export default function Users() {
  const utils = api.useUtils();

  const { data: users, isLoading } = api.users.list.useQuery();

  const create = api.users.create.useMutation({
    onSuccess: () => utils.users.list.invalidate(),
  });

  const deactivate = api.users.deactivate.useMutation({
    onSuccess: () => utils.users.list.invalidate(),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("USER");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    create.mutate({
      email,
      password,
      role,
    });

    setEmail("");
    setPassword("");
    setRole("USER");
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      </header>

      <section className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black"
            required
          />

          <div className="flex gap-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-black focus:outline-none"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button
              type="submit"
              disabled={create.isPending}
              className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {create.isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        {isLoading && (
          <p className="text-gray-500">Loading users...</p>
        )}

        {users?.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        {users?.map((user) => (
          <article
            key={user.id}
            className="rounded-xl border bg-white p-5 shadow-sm text-gray-900"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900">{user.email}</h2>

                <div className="mt-3 flex gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${roleStyles[user.role]}`}
                  >
                    {user.role}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {user.active && (
                <button
                  onClick={() => deactivate.mutate({ id: user.id })}
                  disabled={deactivate.isPending}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {deactivate.isPending ? "Deactivating..." : "Deactivate"}
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}