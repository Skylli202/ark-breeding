import { z } from "zod";

export const formNewClanSchema = z.object({
  name: z.string().min(2)
})
export const formJoinClanSchema = z.object({
  code: z.string().min(6).max(6)
})
export const formGenJoinClanCodeSchema = z.object({
  clanId: z.string().nonempty(),
  code: z.string().optional(),
})
