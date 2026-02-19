import { z } from "zod";

export const updateUserSchema = z.object({
  nickname: z
    .string("Nickname is required")
    .min(3, "Minimum nickname length is 3"),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
