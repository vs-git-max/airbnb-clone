import Image from "next/image";
import { LuHeart } from "react-icons/lu";

interface ListingProps {
  id: number;
  title: string;
  location: string;
  image: string;
  price: number;
}

interface ListingCardProps {
  listing: ListingProps;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  console.log(listing);
  return (
    <div className="group  cursor-pointer">
      {/* image */}
      <div className="overflow-hidden relative aspect-square rounded-xl ">
        <Image
          src={listing.image}
          alt={listing.title}
          className="object-cover transition group-hover:scale-105 "
          fill
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow cursor-pointer">
          <LuHeart size={18} className="text-gray-700 " />
        </button>
      </div>
      <div className="space-y-1 mt-3 text-sm">
        <p className="text-gray-500">{listing.location}</p>
        <p className="text-gray-900 truncate font-medium">{listing.title}</p>
        <p className="pt-1">
          <span className="font-semibold text-gray-900">${listing.price}</span>{" "}
          /<span className="text-gray-500">night</span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
