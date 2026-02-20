import ListingPage from "@/app/components/listing/ListingPage";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const listingId = await (await params).listingId;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ListingPage listingId={listingId} />
    </Suspense>
  );
}
