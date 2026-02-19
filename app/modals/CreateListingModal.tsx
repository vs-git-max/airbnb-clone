"use client";

import { useState } from "react";
import { useCreateListingModal } from "../store/useCreateListingModal";
import Modal from "./Modal";
import Button from "../components/ui/Button";
import { categories } from "../constants/Categories";
import CategoryCard from "../components/listing/CategoryCard";
import CountrySelect from "../components/listing/CountrySelect";
import { Country } from "../hooks/userCountries";
import dynamic from "next/dynamic";
import Counter from "../components/listing/Counter";
import Input from "../components/ui/Input";

export default function CreateListingModal() {
  const { isOpen, close } = useCreateListingModal();

  //steps
  const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    COUNTERS: 2,
    DETAILS: 3,
    IMAGE: 4,
    PRICE: 5,
  };

  const [step, setStep] = useState(STEPS.CATEGORY);

  const stepTittle = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return "Which of these describe your home";

      case STEPS.LOCATION:
        return "Where is your place located";

      case STEPS.COUNTERS:
        return "Share some basics about your place";

      case STEPS.DETAILS:
        return "How would you describe your place";

      case STEPS.IMAGE:
        return "Upload the images of your place";

      case STEPS.PRICE:
        return "Price per night";

      default:
        return "";
    }
  };

  async function createListing() {
    alert("Form submitted");
  }

  //state for the category and selected
  const [category, setCategory] = useState<string | null>(null);

  //location states
  const [location, setLocation] = useState<null | Country>(null);

  //something about the map thing
  const MapComponent = dynamic(
    () => import("../components/general/map/MapComponent"),
    {
      ssr: false,
      loading: () => <p className="text-center py-6">Loading map...</p>,
    },
  );

  //counter states
  const [guestCount, setGuestCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  //details states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Modal isOpen={isOpen} onClose={close} title="Create new listing">
      {/* step indicator */}

      <div className="mb-7 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 6</span>
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

        {step === STEPS.COUNTERS && (
          <div className="space-y-2">
            <Counter
              title="Guests"
              subtitle="How many guests can stay?"
              value={guestCount}
              onChange={setGuestCount}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms are available?"
              value={roomCount}
              onChange={setRoomCount}
            />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms?"
              value={bathroomCount}
              onChange={setBathroomCount}
            />
          </div>
        )}
        {step === STEPS.DETAILS && (
          <div className="space-y-10 w-full">
            <Input
              name="title"
              label="Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
            <Input
              as="textarea"
              name="description"
              label="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
            />
            <p className="text-xs text-gray-400">Short titles work best</p>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="mt-8 flex gap-3">
        {step > STEPS.CATEGORY && (
          <Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
            Back
          </Button>
        )}
        <Button
          onClick={() =>
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : createListing()
          }
        >
          {step === STEPS.PRICE ? "Create listing" : "Next"}
        </Button>
      </div>
    </Modal>
  );
}
