import { Listing } from "@/app/generated/prisma/client";
import useCountries from "@/app/hooks/userCountries";
import Image from "next/image";
import HeartButton from "../favorites/HeartButton";

interface ListingCardProps {
  listing: Listing;
  currentUser: {
    id: string;
    favorites: string[];
  } | null;
  hideFav?: boolean;
}

const ListingCard = ({ hideFav, listing, currentUser }: ListingCardProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);

  return (
    <div className="group  cursor-pointer">
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
        <p className="pt-1">
          <span className="font-semibold text-gray-900">${listing.price}</span>{" "}
          /<span className="text-gray-500">night</span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
