import PropertiesPage from "@/app/components/properties/PropertiesPage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PropertiesPage />
    </Suspense>
  );
}
