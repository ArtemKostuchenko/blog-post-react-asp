import { z } from "zod";
import { getFormateImageFormats } from "../func";

const fileSizeLimit =
  Number(import.meta.env.VITE_IMAGE_SIZE_LIMIT) || 10 * 1024 * 1024;
const imageFormats =
  (import.meta.env.VITE_IMAGE_FORMATS as string) || "jpeg, png, webp";

export const image = z
  .instanceof(File)
  .refine((file) => getFormateImageFormats(imageFormats).includes(file.type), {
    message: `Invalid image file type. Supported ${imageFormats}`,
  })
  .refine((file) => file.size <= fileSizeLimit, {
    message: "Image size should not exceed 5MB",
  });
