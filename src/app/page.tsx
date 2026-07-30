import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export default function HomePage() {
  return (
    <PageContainer
      title="Incident Log App"
      description="Internal application for tracking and resolving incidents."
    >

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/incidents"
          className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="font-semibold">Incidents</h2>
        </Link>

        <Link
          href="/users"
          className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="font-semibold">Users</h2>
        </Link>

        <Link
          href="/how-it-works"
          className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="font-semibold">How it Works</h2>
        </Link>
      </div>
    </PageContainer>
  );
}