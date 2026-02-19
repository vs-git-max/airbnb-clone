"use client";
import { useFav } from "@/app/hooks/useFavorites";
import clsx from "clsx";

import { LuHeart } from "react-icons/lu";

interface HeartButtonProps {
  listingId: string;
  currentUser: {
    id: string;
    favorites: string[];
  } | null;
}

export default function HeartButton({
  currentUser,
  listingId,
}: HeartButtonProps) {
  const { fav, toggleFav } = useFav({ currentUser, listingId });

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFav();
      }}
      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow cursor-pointer"
    >
      <LuHeart
        size={18}
        className={clsx(
          "transition",
          fav ? "fill-rose-500 text-rose-500" : "text-gray-500",
        )}
      />
    </button>
  );
}
