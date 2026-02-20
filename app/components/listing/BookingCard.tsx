"use client";

import { differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange, type Range } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../ui/Button";
import { LuCheck } from "react-icons/lu";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  pricePerNight: number;
  listingId: string;
  hostId: string;
  reservations: {
    startDate: string;
    endDate: string;
  }[];
}

export default function BookingCard({
  pricePerNight,
  reservations,
  listingId,
  hostId,
}: BookingCardProps) {
  const router = useRouter();
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const startDate = range[0]?.startDate;
  const endDate = range[0]?.endDate;
  const nights =
    startDate && endDate
      ? Math.max(differenceInCalendarDays(endDate, startDate), 1)
      : 0;

  const totalPrice = nights * pricePerNight;
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const isDisabledForHost = session?.user.id === hostId;

  async function onReserve() {
    if (!startDate || !endDate) return;

    if (!session) {
      toast("Please login to reserve", {
        style: {
          background: "#ff5a5a",
          color: "white",
        },
      });
      return;
    }

    try {
      await axios.post("/api/reseervations", {
        startDate,
        endDate,
        listingId,
        totalPrice,
      });

      toast("Reservation created successfully", {
        style: {
          background: "#052e16",
          color: "#fff",
        },
      });

      router.refresh();
      router.push("/trips");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.message || "Something happened", {
          style: {
            background: "#ff5a5a",
            color: "#fff8ff",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const disabledDate = reservations.flatMap((reservation) =>
    eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    }),
  );
  return (
    <div className="lg:sticky lg:top-0">
      <div className="border border-gray-200  rounded-2xl p-2 sm:p-8 shadow-xl bg-white">
        <div className="flex items-center gap-2 mb-6">
          <p className="text-xl font-bold">${pricePerNight}</p>
          <span className="text-lg text-gray-600 ">per night</span>
        </div>

        <div className="overflow-auto bg-white no-scrollbar">
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            minDate={new Date()}
            showDateDisplay={false}
            rangeColors={["#ff5a5f"]}
            disabledDates={disabledDate}
          />
        </div>

        {/* selected date */}
        <div className="border border-gray-300 rounded-xl overflow-hidden mt-4 mb-6 ">
          <div className="grid grid-cols-2">
            <div className="p-4 ">
              <p className="text-sm font-bold uppercase">Check in</p>
              <p className="font-semibold">
                {startDate ? format(startDate, "MMM d, yyyy") : "-"}
              </p>
            </div>
            <div className="p-4 ">
              <p className="text-sm font-bold uppercase">Check out</p>
              <p className="font-semibold">
                {endDate ? format(endDate, "MMM d, yyyy") : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* pricing */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span className="">
              ${pricePerNight} x {nights}
            </span>
            <span className="">{totalPrice}</span>
          </div>

          <div className="border-t pt-4 justify-between font-bold text-lg">
            <span className="">Total </span>
            <span className="">${totalPrice}</span>
          </div>
        </div>

        {/* reservation button */}
        <Button
          disabled={isDisabledForHost || loading}
          onClick={onReserve}
          loading={loading}
          rounded
        >
          Reserve
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          <LuCheck className="inline mr-2 text-green-500" />
          You won&apos;t be charged yet
        </p>
      </div>
    </div>
  );
}
