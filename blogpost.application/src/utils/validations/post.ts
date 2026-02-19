import { string, z } from "zod";
import { image } from "./image";

export const postSchema = z.object({
  image: image.optional(),
  title: string().min(3, "Minimum title length is 10"),
  content: string().min(15, "Minimum content length is 10"),
});

export type PostFormData = z.infer<typeof postSchema>;
