import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ reservationId: string }> },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 404 });
  }

  const { reservationId } = await params;
  if (!reservationId) {
    return NextResponse.json(
      { error: "Missing reservation id" },
      { status: 400 },
    );
  }

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
    include: {
      listing: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!reservation) {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 },
    );
  }

  //check the ownership of the reservation
  const isGuest = reservation.userId === currentUser?.id;
  const isHost = reservation.listing.userId === currentUser?.id;

  if ([isGuest, isHost].every((item) => !item)) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  await prisma.reservation.delete({
    where: { id: reservationId },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
