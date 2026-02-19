import cloudinary from "../lib/Cloudinary";

export type CloudinaryUploadResults = {
  secure_url: string;
  public_id: string;
};

export async function uploadToCloudinary(
  file: File,
): Promise<CloudinaryUploadResults> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataURl = `data:${file.type};base64,${base64}`;

  try {
    const res = await cloudinary.uploader.upload(dataURl, {
      folder: "airbnb-clone",
      transformation: [{ format: "webp" }],
    });
    return {
      secure_url: res.secure_url,
      public_id: res.public_id,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload image");
  }
}
