import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Users from "./users";

export default async function UsersPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return <Users />;
}