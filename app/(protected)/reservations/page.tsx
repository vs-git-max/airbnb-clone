import { Suspense } from "react";
import ReservationPage from "@/app/components/reservations/ReservationPage";
import ListingCardSkeleton from "@/app/components/skeletons/ListingCardSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <ReservationPage />
    </Suspense>
  );
}
