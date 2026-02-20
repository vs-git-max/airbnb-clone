import { Suspense } from "react";
import ReservationPage from "@/app/components/reservations/ReservationPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReservationPage />
    </Suspense>
  );
}
