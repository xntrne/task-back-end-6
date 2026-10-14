import { z } from "zod";

// todo_Id_Params_Schema
export const todoIdParamsSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer").max(2147483647, "id is too large"),
});

// create_Todo_Schema
export const createTodoSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  body: z.string().trim().optional().default(""),
});

// update_Todo_Schema
export const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1, "title cannot be empty"),
    body: z.string().trim(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one of title, body must be provided",
  });
