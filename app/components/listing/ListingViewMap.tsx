"use client";

import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/userCountries";

interface ListingViewMapProps {
  price: number;
  locationValue: string;
}

export default function ListingViewMap({
  price,
  locationValue,
}: ListingViewMapProps) {
  const MapComponent = dynamic(() => import("../general/map/MapComponent"), {
    ssr: false,
    loading: () => <p className="text-center py-6">Loading map...</p>,
  });

  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  if (!location) return null;

  return (
    <div className="h-120 overflow-hidden  border border-gray-500">
      <MapComponent center={location?.latlng} price={price} />
    </div>
  );
}
