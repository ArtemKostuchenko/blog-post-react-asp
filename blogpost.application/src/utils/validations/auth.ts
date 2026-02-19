import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .min(8, "Too small password. Minimum 8 characters")
    .max(32, "Too big password. Maximum 32 characters")
    .trim(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  nickname: z.string().min(3, "Minimum nickname length is 3"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
