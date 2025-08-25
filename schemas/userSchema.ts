// src/schemas/userSchema.ts

import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  contact: z.string(),
});

export const createUserSchema = userSchema.omit({ id: true });

export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
