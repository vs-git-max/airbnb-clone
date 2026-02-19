import FavoritePage from "@/app/components/favorites/FavoritePage";
import { Suspense } from "react";

export default function FavoritesPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FavoritePage />
    </Suspense>
  );
}
