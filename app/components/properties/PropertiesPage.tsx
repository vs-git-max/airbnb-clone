import { getProperties } from "@/app/server-actions/getProperties";
import EmptyListings from "../ui/EmptyListings";
import ListingCard from "../listing/ListingCard";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";

export default async function PropertiesPage() {
  const listings = await getProperties();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyListings
        title="No properties yet"
        subtitle="Add properties places"
      />
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((listing) => (
          <ListingCard
            hideFav={true}
            key={listing.id}
            currentUser={currentUser}
            listing={listing}
            property
          />
        ))}
      </div>
    </div>
  );
}
