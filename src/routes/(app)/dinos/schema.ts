import { z } from "zod";

export const formSchema = z.object({
  // TODO: Check dino name max length in game
  // TODO: Add dino level and implement a check that sum of all stats level +1 equal dino level
  name: z.string().max(16),
  healthLevels: z.coerce.number(),
  staminaLevels: z.coerce.number(),
  weightLevels: z.coerce.number(),
  damageLevels: z.coerce.number(),
  oxygenLevels: z.coerce.number(),
  foodLevels: z.coerce.number(),
})
