import ListingPage from "@/app/components/listing/ListingPage";
import ListingDetailsSkeleton from "@/app/components/skeletons/ListingDetailsSkeleton";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const listingId = await (await params).listingId;

  return (
    <Suspense fallback={<ListingDetailsSkeleton />}>
      <ListingPage listingId={listingId} />
    </Suspense>
  );
}
