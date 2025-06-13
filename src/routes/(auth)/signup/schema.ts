import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(128)
})

export type FormSchema = typeof formSchema
