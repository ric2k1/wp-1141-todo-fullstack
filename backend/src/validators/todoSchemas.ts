import { z } from 'zod';

export const createTodoSchema = z.object({
  text: z.string().min(1, "Text is required").max(500, "Text too long"),
  description: z.string().max(2000, "Description too long").optional().default("")
});

export const updateTodoSchema = z.object({
  text: z.string().min(1).max(500).optional(),
  description: z.string().max(2000).optional(),
  completed: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided"
});

export const todoIdSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number)
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoIdInput = z.infer<typeof todoIdSchema>;

