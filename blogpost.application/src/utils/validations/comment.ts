import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string("The content is required")
    .min(10, "The minimum content size is 10"),
});

export type CommentFormData = z.infer<typeof commentSchema>;
