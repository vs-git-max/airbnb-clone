import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      image: true,
      favorites: true,
    },
  });

  return user;
}
