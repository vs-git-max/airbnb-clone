import { Suspense } from "react";
import Listings from "./components/listing/Listings";
import Containers from "./layouts/Containers";
import ListingCardSkeleton from "./components/skeletons/ListingCardSkeleton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  return (
    <Containers>
      <Suspense fallback={<ListingCardSkeleton isHome />}>
        <Listings searchParams={searchParams} />
      </Suspense>
    </Containers>
  );
}
