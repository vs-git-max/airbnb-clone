import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ listingId: string }> },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId } = await params;
    if (!listingId)
      return NextResponse.json(
        { error: "Invalid listing id" },
        { status: 400 },
      );

    const user = await prisma.user.update({
      where: { id: currentUser?.id },
      data: {
        favorites: {
          push: listingId,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "[LISTING_ID]");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ listingId: string }> },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId } = await params;
    if (!listingId)
      return NextResponse.json(
        { error: "Invalid listing id" },
        { status: 400 },
      );

    const user = await prisma.user.findUnique({
      where: { id: currentUser?.id },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updatedFavoriteId = user.favorites.filter(
      (id: string) => id !== listingId,
    );
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: {
        favorites: updatedFavoriteId,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "[LISTING_ID]");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
