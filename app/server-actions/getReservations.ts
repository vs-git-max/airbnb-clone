import prisma from "../lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getReservations() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const reservation = await prisma.reservation.findMany({
    where: {
      listing: {
        userId: currentUser.id,
      },
    },
    include: {
      listing: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reservation.map((res) => ({
    ...res,
    createdAt: res.createdAt.toISOString(),
    startDate: res.startDate.toISOString(),
    endDate: res.endDate.toISOString(),
  }));
}
