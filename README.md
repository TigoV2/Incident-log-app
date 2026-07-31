# Incident Log App

A small internal incident management application built with:

* Next.js (App Router)
* TypeScript
* tRPC
* Prisma
* PostgreSQL 16
* Docker Compose
* NextAuth Credentials authentication

The application allows users to sign in, view incidents, create new incidents, and mark incidents as resolved. Administrators can manage users.

---

## Requirements

Install the following before running the application:

- Docker Desktop (includes Docker Compose)
- Node.js 22+
- npm (included with Node.js)

Verify your installation:

```bash
node -v
npm -v
docker -v
```

---

## Getting started

### 1. Get the source code

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

Alternatively, download the source code as a ZIP file:

1. Open the repository page.
2. Select **Code**.
3. Select **Download ZIP**.
4. Extract the archive.
5. Open a terminal in the extracted project folder.

---

### 2. Configure environment variables

Create your local environment file:

```bash
cp .env.example .env
```

Update `.env` with your local values.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/incidentlog"

AUTH_SECRET="your-secret-here"
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST=true

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-me"
```

Do not commit `.env` files. They contain local secrets.

---

### 3. Start the application

Build and start the containers:

```bash
docker compose up --build -d
```

This starts:

* Next.js application container
* PostgreSQL 16 database container

PostgreSQL uses a named Docker volume, meaning database data survives container restarts.

The application container connects to the PostgreSQL container through the Docker Compose network.
The hostname `postgres` in `DATABASE_URL` refers to the PostgreSQL service defined in `docker-compose.yml`, rather than `localhost`.

The application is available at:

```
http://localhost:3000
```

The application container includes a Docker health check that monitors the `/api/health` endpoint to verify the application is running correctly.

---

## Troubleshooting

If you run into dependency issues or problems with `package-lock.json`, reinstall the project dependencies:

```bash
npm install
```

---

## Database setup

After the containers are running, apply migrations:

```bash
docker compose exec app npx prisma migrate deploy
```

Seed the database:

```bash
docker compose exec app npx prisma db seed
```

The seed script creates an initial admin user.

---

## First login

Use the admin account created by the seed script.

Example:

```
Email:
admin@example.com

Password:
<seed-password>
```

---

## Using the application

### Incidents

Users can:

* View incidents
* Create incidents
* Select a severity level
* Resolve open incidents

Each incident contains:

* Title
* Description
* Severity
* Status
* Creator
* Creation timestamp
* Resolution timestamp

Severity levels:

| Level    | Description                                                 |
| -------- | ----------------------------------------------------------- |
| LOW      | Minor issue that should be tracked                          |
| MEDIUM   | Issue that should be handled soon                           |
| HIGH     | Serious issue requiring quick attention                     |
| CRITICAL | Major outage or security issue requiring immediate response |

Open incidents are displayed before resolved incidents, with higher severity incidents shown first.

---

### Users

Administrators can:

* View users
* Create users
* Deactivate users

User management actions are protected by server-side authorization checks.

---

## Architecture

The application follows this flow:

```
Browser
   |
   v
Next.js App Router
   |
   v
tRPC Procedures
   |
   v
Prisma ORM
   |
   v
PostgreSQL
```

### Next.js

Responsible for:

* Pages and routes
* UI components
* Client and server functionality

### tRPC

Provides type-safe communication between the frontend and backend.

The client calls server procedures directly while TypeScript keeps request and response types synchronized.

### Prisma

Handles:

* Database schema
* Migrations
* Type-safe database queries

### PostgreSQL

Stores:

* Users
* Incidents
* Relationships between data

---

## Authentication and authorization

Authentication uses email and password login.

Passwords are:

* Hashed before storage
* Never stored in plain text

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

Admin-only functionality is protected on the server, not only hidden in the interface.

---

## Useful Docker commands

Stop containers:

```bash
docker compose down
```

Stop containers and remove database data:

```bash
docker compose down -v
```

View running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Rebuild containers:

```bash
docker compose up --build
```

---

## Reset the database

To completely reset the local database:

```bash
docker compose down -v
docker compose up --build
```

Then run:

```bash
docker compose exec app npx prisma migrate deploy
docker compose exec app npx prisma db seed
```

---

## Development without Docker

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

---

## Project structure

```
app/
  Next.js pages and routes

components/
  Reusable UI components

server/
  tRPC procedures

prisma/
  Database schema, migrations, and seed files

lib/
  Shared utilities
```

---

## Notes

Implementation decisions, AI usage, and possible future improvements are documented in `NOTES.md`.