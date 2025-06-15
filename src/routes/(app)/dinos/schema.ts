import { z } from "zod";

export const formSchema = z.object({
  // TODO: Check dino name max length in game
  // TODO: Add dino level and implement a check that sum of all stats level +1 equal dino level
  name: z.string().max(16),
  entityId: z.string(),
  healthLevels: z.coerce.number().positive('Oops! A dino cannot have 0 or less levels in health!'),
  staminaLevels: z.coerce.number().positive('Oops! A dino cannot have 0 or less levels in stamina!'),
  weightLevels: z.coerce.number().positive('Oops! A dino cannot have 0 or less levels in weight!'),
  damageLevels: z.coerce.number().positive('Oops! A dino cannot have 0 or less levels in damage!'),
  oxygenLevels: z.coerce.number().positive('Oops! A dino cannot have 0 or less levels in oxygen!'),
  foodLevels: z.coerce.number().positive('Oops! A dino cannot have 0 or less levels in food!'),
})
