"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

const severityStyles = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
} as const;

const statusStyles = {
  OPEN: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-gray-100 text-gray-700",
} as const;

type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export default function IncidentsPage() {
  const utils = api.useUtils();

  const { data: incidents, isLoading } = api.incident.list.useQuery();

  const create = api.incident.create.useMutation({
    onSuccess: () => utils.incident.list.invalidate(),
  });

  const resolve = api.incident.resolve.useMutation({
    onSuccess: () => utils.incident.list.invalidate(),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("LOW");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    create.mutate({
      title,
      description,
      severity,
    });

    setTitle("");
    setDescription("");
    setSeverity("LOW");
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Incidents</h1>
      </header>

      <section className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Incident title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black"
          />

          <div className="flex gap-3">
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as Severity)}
              className="rounded-lg border p-3"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>

            <button
              type="submit"
              disabled={create.isPending}
              className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {create.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        {isLoading && (
          <p className="text-gray-500">Loading incidents...</p>
        )}

        {incidents?.length === 0 && (
          <p className="text-gray-500">No incidents found.</p>
        )}

        {incidents?.map((inc) => (
          <article
            key={inc.id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{inc.title}</h2>

                <p className="mt-2 text-gray-600">
                  {inc.description}
                </p>

                <div className="mt-4 flex gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${severityStyles[inc.severity]}`}
                  >
                    {inc.severity}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[inc.status]}`}
                  >
                    {inc.status}
                  </span>
                </div>
              </div>

              {inc.status === "OPEN" && (
                <button
                  onClick={() => resolve.mutate({ id: inc.id })}
                  disabled={resolve.isPending}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {resolve.isPending ? "Resolving..." : "Resolve"}
                </button>
              )}
            </div>

            {"createdBy" in inc && (
              <div className="mt-4 text-xs text-gray-500">
                Created by: {inc.createdBy.email}
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}