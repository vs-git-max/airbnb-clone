import Listings from "./components/listing/Listings";
import Containers from "./layouts/Containers";

export interface HomeProps {
  searchParams: {
    category?: string;
    locationValue?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <Containers>
      <Listings searchParams={searchParams} />
    </Containers>
  );
}
