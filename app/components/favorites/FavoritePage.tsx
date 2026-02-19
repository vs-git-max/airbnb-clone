import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { getFavoriteListings } from "@/app/server-actions/getFavListings";
import EmptyListings from "../ui/EmptyListings";
import ListingCard from "../listing/ListingCard";

export default async function FavoritePage() {
  const currentUser = await getCurrentUser();

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyListings
        title="No favorites yet"
        subtitle="Explore favorite places"
      />
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your favorite listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            listing={listing}
          />
        ))}
      </div>
    </div>
  );
}
