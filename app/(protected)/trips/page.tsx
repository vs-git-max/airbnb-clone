import TripsPage from "@/app/components/trips/TripsPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TripsPage />
    </Suspense>
  );
}
