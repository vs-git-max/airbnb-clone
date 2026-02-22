"use client";

import { useState } from "react";
import { useFilterModal } from "../store/userFilterListingModal";
import Modal from "./Modal";
import useCountries, { Country } from "../hooks/userCountries";
import Button from "../components/ui/Button";
import CategoryCard from "../components/listing/CategoryCard";
import { categories } from "../constants/Categories";
import CountrySelect from "../components/listing/CountrySelect";
import dynamic from "next/dynamic";
import Input from "../components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";

//steps
const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  PRICE: 2,
};

export default function FilterModal() {
  const { getByValue } = useCountries();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("minPrice") ?? "",
  );

  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") ?? "",
  );
  const [category, setCategory] = useState<string>(
    searchParams.get("category") ?? "",
  );

  const router = useRouter();

  const getLocationFromParams = () => {
    const locationValue = searchParams.get("locationValue");

    if (!locationValue) return null;

    return getByValue(locationValue) ?? null;
  };
  const [location, setLocation] = useState<null | Country>(
    getLocationFromParams(),
  );

  const { isOPen, close } = useFilterModal();

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (location) params.set("locationValue", location.value);

    router.push(`?${params.toString()}`);
    setStep(STEPS.CATEGORY);
    setCategory(null);
    setMinPrice("");
    setLocation(null);
    setMaxPrice("");
    close();
  };

  const stepTittle = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return "Select a category";

      case STEPS.LOCATION:
        return "Select a location";

      case STEPS.PRICE:
        return "Select a price range";

      default:
        return "";
    }
  };

  const MapComponent = dynamic(
    () => import("../components/general/map/MapComponent"),
    {
      ssr: false,
      loading: () => <p className="text-center py-6">Loading map...</p>,
    },
  );

  const disableFilterButton =
    [category, location, minPrice, maxPrice].every((item) => !item) &&
    step === STEPS.PRICE;

  if (disableFilterButton) return null;

  return (
    <Modal title="Filter Listings" isOpen={isOPen} onClose={close}>
      <div className="mb-7 flex items-center justify-between text-sm text-gray-500">
        <span>Filter {step + 1} of 3</span>
        <span className="font-medium text-gray-700">{stepTittle()}</span>
      </div>

      <div className="min-h-55 flex items-center justify-center rounded-xl text-gray-400 px-6">
        {step === STEPS.CATEGORY && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {categories.map((item) => (
              <CategoryCard
                key={item.slug}
                label={item.label}
                icon={item.icon}
                selected={category === item.slug}
                onClick={() => setCategory(item.slug)}
              />
            ))}
          </div>
        )}

        {step == STEPS.LOCATION && (
          <div className="w-full space-y-2 p-6">
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value)}
            />
            <div className="h-80 overflow-hidden border">
              {" "}
              <MapComponent center={location?.latlng || [51.505, -0.09]} />
            </div>
          </div>
        )}

        {step === STEPS.PRICE && (
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinPrice(e.target.value)
                }
                label="Min price"
                name="min-price"
                type="number"
                value={minPrice}
              />
            </div>
            <div className="">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxPrice(e.target.value)
                }
                label="Max price"
                name="max-price"
                type="number"
                value={maxPrice}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > STEPS.CATEGORY && (
          <Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
            Back
          </Button>
        )}
        <Button
          disabled={disableFilterButton}
          onClick={() =>
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : applyFilters()
          }
        >
          {step === STEPS.PRICE ? "Apply Filters" : "Next"}
        </Button>
      </div>
    </Modal>
  );
}
