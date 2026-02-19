/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import toast from "react-hot-toast";

export interface UserFavoritesProps {
  listingId: string;
  currentUser: {
    id: string;
    favorites: string[];
  } | null;
}

export function useFav({ currentUser, listingId }: UserFavoritesProps) {
  const fav = currentUser?.favorites?.includes(listingId);

  const toggleFav = async () => {
    if (!currentUser) {
      toast("Pass the current user", {
        style: {
          background: "#ff5a5a",
          color: "white",
        },
      });
      return;
    }
    try {
      if (fav) {
        await axios.delete(`/api/favorites/${listingId}`);
      } else {
        await axios.post(`/api/favorites/${listingId}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return {
    toggleFav,
    fav,
  };
}
