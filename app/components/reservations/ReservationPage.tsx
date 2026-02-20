import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { getReservations } from "@/app/server-actions/getReservations";
import EmptyListings from "../ui/EmptyListings";
import ListingCard from "../listing/ListingCard";

export default async function ReservationPage() {
  const reservations = await getReservations();
  const currentUser = await getCurrentUser();

  if (reservations.length === 0) {
    return (
      <EmptyListings
        title="No reservations found"
        subtitle="Looks like your listings have not been reserved"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            currentUser={currentUser}
            listing={reservation.listing}
            reservation={{
              id: reservation.id,
              startDate: reservation.startDate,
              endDate: reservation.endDate,
              totalPrice: reservation.totalPrice,
            }}
            trip
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </div>
  );
}
