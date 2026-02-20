import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if ([listingId, startDate, endDate, totalPrice].some((item) => !item)) {
      return NextResponse.json(
        { error: "Provide all fields" },
        { status: 400 },
      );
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (listing.userId === currentUser?.id) {
      return NextResponse.json(
        { error: "You cannot list your own property" },
        { status: 403 },
      );
    }

    //check for overlapping reservations
    const existingReservations = await prisma.reservation.findFirst({
      where: {
        listingId,
        AND: [
          {
            startDate: { lte: new Date(startDate) },
          },
          {
            endDate: { lte: new Date(endDate) },
          },
        ],
      },
    });

    if (existingReservations) {
      return NextResponse.json(
        { error: "Dates are already reserved" },
        { status: 409 },
      );
    }

    //create a new reservation
    const reservation = await prisma.reservation.create({
      data: {
        listingId,
        totalPrice,
        userId: currentUser?.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
