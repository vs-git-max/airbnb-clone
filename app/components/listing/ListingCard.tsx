"use client";
import useCountries from "@/app/hooks/userCountries";
import Image from "next/image";
import HeartButton from "../favorites/HeartButton";
import { useRouter } from "next/navigation";
import { Listing } from "@/app/types/listing";
import { format } from "date-fns";
import CancelReservationButton from "../reservations/CancelReservationButton";

interface ListingCardProps {
  listing: Listing;
  currentUser: {
    id: string;
    favorites: string[];
  } | null;
  hideFav?: boolean;
  property?: boolean;
  reservation?: {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
  };
  trip?: boolean;
  actionLabel?: string;
}

const ListingCard = ({
  property,
  hideFav,
  listing,
  currentUser,
  reservation,
  trip,
  actionLabel,
}: ListingCardProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/listings/${listing?.id}`)}
      className="group  cursor-pointer"
    >
      {/* image */}
      <div className="overflow-hidden relative aspect-square rounded-xl ">
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          className="object-cover transition group-hover:scale-105 "
          fill
        />
        {!hideFav && (
          <HeartButton listingId={listing?.id} currentUser={currentUser} />
        )}
      </div>
      <div className="space-y-1 mt-3 text-sm">
        <p className="text-gray-500">
          {location
            ? `${location.region} ,${location.label}`
            : listing.locationValue}
        </p>
        <p className="text-gray-900 truncate font-medium">{listing.title}</p>
        {reservation ? (
          <>
            <p className="text-gray-500 text-sm">
              {format(new Date(reservation.startDate), "MMM d")} -{" "}
              {format(new Date(reservation.endDate), "MMM d")}
            </p>
            <p className="pt-1 font-semibold text-gray-900">
              ${reservation.totalPrice}
            </p>
          </>
        ) : (
          <p className="pt-1">
            <span className="font-semibold text-gray-900">
              ${listing.price}
            </span>{" "}
            /<span className="text-gray-500">night</span>
          </p>
        )}
        {property && (
          <div className="mt-3">
            <p className="text-sm text-gray-500">
              Listed on {new Date(listing.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {trip && reservation && actionLabel && (
          <CancelReservationButton
            actionLabel={actionLabel}
            reservationId={reservation?.id}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
