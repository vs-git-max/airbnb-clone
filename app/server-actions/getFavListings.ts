import prisma from "../lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getFavoriteListings() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser?.id },
    select: {
      favorites: true,
    },
  });

  if (!user || user.favorites.length === 0) {
    return [];
  }

  //fetch the listings
  const listings = await prisma.listing.findMany({
    where: {
      id: {
        in: user.favorites,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return listings;
}
