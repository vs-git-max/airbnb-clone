import BookingCard from "@/app/components/listing/BookingCard";
import { getListing } from "@/app/server-actions/getListing";
import Image from "next/image";
import ListingViewMap from "./ListingViewMap";
import { LuBath, LuBedDouble, LuUsers } from "react-icons/lu";

interface ListingPageProps {
  listingId: string;
}

export default async function ListingPage({ listingId }: ListingPageProps) {
  const listing = await getListing(listingId);

  if (!listing) return null;

  return (
    <div className="max-w-6xl mx-auto">
      {/* header */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2 sm:py-4 text-gray-900 leading-tight">
        {listing?.title}
      </h2>

      {/* hero image */}
      <div className="relative w-full h-80 sm:h-120 lg:h-150 rounded-2xl overflow-hidden shadow-2xl mb-10">
        <Image
          className="object-cover"
          fill
          alt={listing?.title}
          src={listing?.imageSrc}
        />
      </div>
      {/* main content */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* left */}
        <div className="lg:col-span-2">
          {/* host info card */}
          <div className="flex items-center gap-3 rounded-2xl">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-4 border-white">
              {listing.user.image ? (
                <Image
                  fill
                  src={listing.user.image}
                  alt={listing.user.name}
                  className="object-cover"
                />
              ) : (
                <Image
                  fill
                  src="/images/image.png"
                  alt={listing.user.name}
                  className="object-cover"
                />
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-800 ">
                Hosted by {listing.user.name}
              </h2>

              <div className="flex items-center flex-wrap gap-3 text-sm text-neutral-600">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuUsers className="text-neutral-500" size={16} />
                  <span className="font-medium text-neutral-800">
                    {listing.guestCount} Guests
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuBedDouble className="text-neutral-500" size={16} />
                  <span className="font-medium text-neutral-800">
                    {listing.roomCount} Rooms
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                  <LuBath className="text-neutral-500" size={16} />
                  <span className="font-medium text-neutral-800">
                    {listing.bathroomCount} Bathrooms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* description */}
          <div className="px-2 py-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              About this space
            </h3>
            <div className="text-gray-700 text-sm leading-relaxed">
              <p className="">{listing.description}</p>
            </div>
          </div>
          <ListingViewMap
            price={listing.price}
            locationValue={listing.locationValue}
          />
        </div>

        {/* right */}
        <BookingCard
          hostId={listing.userId}
          pricePerNight={listing.price}
          listingId={listingId}
          reservations={listing.reservations}
        />
      </div>
    </div>
  );
}
