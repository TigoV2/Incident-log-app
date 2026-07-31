import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl gap-6 p-4">
        <Link href="/" className="font-bold">
          Incident Log
        </Link>

        <Link href="/incidents">
          Incidents
        </Link>

        <Link href="/users">
          Users
        </Link>
        
        <Link href="/how-it-works">
          How it Works
        </Link>
      </div>
    </nav>
  );
}