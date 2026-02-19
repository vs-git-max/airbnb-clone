import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
}
