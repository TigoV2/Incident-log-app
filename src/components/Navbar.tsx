import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl gap-6 p-4 text-gray-900">
        <Link href="/" className="font-bold hover:text-blue-600">
          Incident Log
        </Link>

        <Link href="/incidents" className="hover:text-blue-600">
          Incidents
        </Link>

        <Link href="/users" className="hover:text-blue-600">
          Users
        </Link>

        <Link href="/how-it-works" className="hover:text-blue-600">
          How it Works
        </Link>
      </div>
    </nav>
  );
}