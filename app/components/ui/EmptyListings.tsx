interface EmptyListingsProps {
  title: string;
  subtitle: string;
}

export default function EmptyListings({ title, subtitle }: EmptyListingsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center max-w-sm mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
        {title}
      </h2>
      <p className="my-4 text-gray-600">{subtitle}</p>
    </div>
  );
}
