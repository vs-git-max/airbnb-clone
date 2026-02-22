import FavoritePage from "@/app/components/favorites/FavoritePage";
import ListingCardSkeleton from "@/app/components/skeletons/ListingCardSkeleton";
import { Suspense } from "react";

export default function FavoritesPage() {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <FavoritePage />
    </Suspense>
  );
}
