import ListingCard from "./components/listing/ListingCard";
import Containers from "./layouts/Containers";

const listings = [
  {
    id: 1,
    title: "Modern Apartment in the CBD",
    location: "Johannesburg, South Africa",
    image: "/images/image1.jpeg",
    price: 140,
  },
  {
    id: 2,
    title: "Cozy Loft Near the Old Town",
    location: "Nairobi, Kenya",
    image: "/images/image2.jpeg",
    price: 95,
  },
  {
    id: 3,
    title: "Luxury Beachfront Suite",
    location: "Mombasa, Kenya",
    image: "/images/image3.jpeg",
    price: 220,
  },
  {
    id: 4,
    title: "Minimalist Studio with City View",
    location: "Cape Town, South Africa",
    image: "/images/image4.jpeg",
    price: 175,
  },
  {
    id: 5,
    title: "Rustic Cabin Retreat",
    location: "Arusha, Tanzania",
    image: "/images/image5.jpeg",
    price: 110,
  },
  {
    id: 6,
    title: "Penthouse with Skyline Balcony",
    location: "Kigali, Rwanda",
    image: "/images/image6.jpeg",
    price: 260,
  },
];

export default function Home() {
  return (
    <Containers>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </Containers>
  );
}
