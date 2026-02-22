import PropertiesPage from "@/app/components/properties/PropertiesPage";
import ListingCardSkeleton from "@/app/components/skeletons/ListingCardSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <PropertiesPage />
    </Suspense>
  );
}
