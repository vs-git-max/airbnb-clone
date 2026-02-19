import { HomeProps } from "@/app/page";
import ListingCard from "./ListingCard";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { getListings } from "@/app/services/listing";
import { Listing } from "@/app/generated/prisma/client";

export default async function Listings({ searchParams }: HomeProps) {
  const params = searchParams;
  const currentUser = await getCurrentUser();
  const listings = await getListings({
    category: params.category,
    locationValue: params.locationValue,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.minPrice ? Number(params.maxPrice) : undefined,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {listings.map((listing: Listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
