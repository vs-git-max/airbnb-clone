import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  preview: string | null;
  onChange: (file: File) => void;
}

export default function ImageUpload({ preview, onChange }: ImageUploadProps) {
  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;
    onChange(file);
  }

  return (
    <div className="relative w-full ">
      <label
        htmlFor="image-upload"
        className="relative flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-gray-600 hover:text-gray-400 min-h-80 transition border-gray-300"
      >
        {!preview && (
          <>
            <TbPhotoPlus size={36} />
            <p className="font-medium">Click to upload</p>
            <p className="text-sm text-gray-400">Upload one image</p>
          </>
        )}

        {preview && (
          <Image
            fill
            className="object-cover rounded-2xl"
            src={preview}
            alt="preview"
          />
        )}
      </label>
      <input
        type="file"
        id="image-upload"
        className="hidden "
        onChange={handleUpload}
      />
    </div>
  );
}
