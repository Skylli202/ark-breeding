import { z } from "zod"

export const formSchema = z.object({ name: z.string(), })
export type FormSchema = typeof formSchema
