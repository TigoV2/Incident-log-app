import PageContainer from "@/components/PageContainer";

const severityLevels = [
  {
    name: "LOW",
    description:
      "A minor issue that should be recorded but does not require immediate attention.",
  },
  {
    name: "MEDIUM",
    description:
      "An issue that should be investigated soon because it may affect normal work.",
  },
  {
    name: "HIGH",
    description:
      "A serious issue that needs quick attention to reduce impact.",
  },
  {
    name: "CRITICAL",
    description:
      "A major outage or security-related issue requiring immediate response.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageContainer
      title="How it Works"
      description="A guide to what this incident log does, how it is built, and how to use it."
    >
      <div className="space-y-8">
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">What this app does</h2>

          <p className="mt-4 text-gray-700">
            This application is an internal incident log used to keep track of
            problems, outages, and security issues. Team members can sign in,
            view existing incidents, create new incidents, and mark incidents
            as resolved when the issue has been fixed.
          </p>

          <p className="mt-4 text-gray-700">
            Each incident records what happened, how serious it is, who created
            it, and when it was resolved. Administrators can also manage users
            and control who has access to the system.
          </p>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">How it is built</h2>

          <p className="mt-4 text-gray-700">
            The frontend is built with Next.js using the App Router and
            TypeScript. Pages run in the browser and communicate with the
            backend through tRPC procedures.
          </p>

          <p className="mt-4 text-gray-700">
            tRPC provides type-safe communication between the client and server.
            Instead of manually creating API endpoints and repeating types, the
            client calls procedures that are defined on the server while
            TypeScript keeps both sides synchronized.
          </p>

          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
            Browser → Next.js → tRPC → Prisma → PostgreSQL
          </div>

          <p className="mt-4 text-gray-700">
            Prisma is the database layer. It defines the database schema,
            handles migrations, and provides type-safe queries to PostgreSQL.
            PostgreSQL runs as its own Docker container with a named volume so
            data remains available after containers are restarted.
          </p>

          <p className="mt-4 text-gray-700">
            The application itself also runs inside Docker. Docker Compose
            starts the required services together: the Next.js application
            container and the PostgreSQL database container.
          </p>

          <p className="mt-4 text-gray-700">
            Authentication uses email and password through NextAuth credentials.
            Passwords are hashed before being stored and are never saved in
            plain text. Authentication verifies who a user is, while
            authorization controls what they are allowed to do. For example,
            only admins can access user management features, and those checks
            are enforced on the server.
          </p>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Getting started</h2>

          <ol className="mt-4 space-y-4 text-gray-700">
            <li>
              <strong>1. Sign in</strong>
              <p>
                Use the admin account created by the seed script when setting up
                the application for the first time.
              </p>
            </li>

            <li>
              <strong>2. Create an incident</strong>
              <p>
                Open the Incidents page, enter a title and description, and
                choose a severity level that matches the impact of the issue.
              </p>
            </li>

            <li>
              <strong>3. Resolve incidents</strong>
              <p>
                Once an issue has been fixed, mark it as resolved. Resolved
                incidents remain visible so there is a history of previous
                problems.
              </p>
            </li>

            <li>
              <strong>4. Understand severity levels</strong>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {severityLevels.map((level) => (
                  <div
                    key={level.name}
                    className="rounded-lg border p-4"
                  >
                    <div className="font-semibold">
                      {level.name}
                    </div>

                    <div className="mt-1 text-sm text-gray-600">
                      {level.description}
                    </div>
                  </div>
                ))}
              </div>
            </li>
          </ol>
        </section>
      </div>
    </PageContainer>
  );
}