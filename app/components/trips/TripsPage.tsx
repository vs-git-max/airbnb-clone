import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { getTrips } from "@/app/server-actions/getTrips";
import EmptyListings from "../ui/EmptyListings";
import ListingCard from "../listing/ListingCard";

export default async function TripsPage() {
  const trips = await getTrips();
  const currentUser = await getCurrentUser();

  if (trips.length === 0) {
    return (
      <EmptyListings
        title="No trips found "
        subtitle="You have not booked any trips yet"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {trips.map((trip) => (
          <ListingCard
            key={trip.id}
            currentUser={currentUser}
            listing={trip.listing}
            reservation={{
              id: trip.id,
              startDate: trip.startDate,
              endDate: trip.endDate,
              totalPrice: trip.totalPrice,
            }}
          />
        ))}
      </div>
    </div>
  );
}
