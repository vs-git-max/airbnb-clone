interface ListingCardSkeletonProps {
  isHome?: boolean;
}

export default function ListingCardSkeleton({
  isHome,
}: ListingCardSkeletonProps) {
  const arrayNumber = isHome ? 10 : 3;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {[...Array(arrayNumber)].map((_, index) => (
        <div className=" animate-pulse" key={index}>
          <div className="aspect-square rounded-xl bg-gray-200" />

          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
