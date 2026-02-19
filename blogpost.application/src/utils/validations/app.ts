import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(3, "Enter at least 3 characters").trim(),
});

export type SearchFormData = z.infer<typeof searchSchema>;
