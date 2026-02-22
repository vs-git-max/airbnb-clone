import ListingCardSkeleton from "@/app/components/skeletons/ListingCardSkeleton";
import TripsPage from "@/app/components/trips/TripsPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <TripsPage />
    </Suspense>
  );
}
