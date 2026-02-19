import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import {
  CloudinaryUploadResults,
  uploadToCloudinary,
} from "@/app/services/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const authUser = await getCurrentUser();

    if (!authUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const roomCount = formData.get("roomCount") as string;
    const guestCount = formData.get("guestCount") as string;
    const description = formData.get("description") as string;
    const locationValue = formData.get("locationValue") as string;
    const bathroomCount = formData.get("bathroomCount") as string;

    if (
      !title ||
      !description ||
      !price ||
      !locationValue ||
      !category ||
      !image
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    //upload the image to cloudinary
    const imageData: CloudinaryUploadResults = await uploadToCloudinary(image);

    const listing = await prisma.listing.create({
      data: {
        title,
        category,
        description,
        locationValue,
        userId: authUser.id,
        price: Number(price),
        roomCount: Number(roomCount),
        guestCount: Number(guestCount),
        imageSrc: imageData.secure_url,
        bathroomCount: Number(bathroomCount),
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.log("[Listing_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const locationValue = searchParams.get("locationValue");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");

    const listings = await prisma.listing.findMany({
      where: {
        ...(category && { category }),
        ...(locationValue && { locationValue }),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice ? { gte: Number(minPrice) } : {}),
                ...(maxPrice ? { lte: Number(maxPrice) } : {}),
              },
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.log("[LISTINGS_Get]", error);
    return NextResponse.json(
      { error: "Failed fetch listings" },
      { status: 500 },
    );
  }
}
