import { useCancelReservations } from "@/app/hooks/useCancelReservations";

interface CancelReservationButtonProps {
  reservationId: string;
  actionLabel: string;
}

export default function CancelReservationButton({
  actionLabel,
  reservationId,
}: CancelReservationButtonProps) {
  const { loadingId, cancelReservation } = useCancelReservations();
  const isLoading = loadingId === reservationId;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        cancelReservation(reservationId);
      }}
      disabled={isLoading}
      className={`mt-3 w-full cursor-pointer border  hover:bg-gray-100 transition disabled:opacity-50 border-gray-300 rounded-lg py-2 text-sm font-medium ${isLoading ? "cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Cancelling..." : actionLabel}
    </button>
  );
}
