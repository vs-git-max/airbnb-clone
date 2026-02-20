import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCancelReservations() {
  const [loadingId, setLoadingId] = useState<null | string>(null);

  const router = useRouter();

  const cancelReservation = async (reservationId: string) => {
    try {
      setLoadingId(reservationId);
      await axios.delete(`/api/reseervations/${reservationId}`);

      toast("Reservation cancelled", {
        style: {
          background: "#3bfa5a",
          color: "white",
        },
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        style: {
          background: "#FF5a5f",
          color: "white",
        },
      });
    } finally {
      setLoadingId(null);
    }
  };

  return {
    loadingId,
    cancelReservation,
  };
}
