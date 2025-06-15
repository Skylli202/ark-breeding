import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { db } from "$lib/server/db";
import { dinosTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  const session = await auth.api.getSession(event.request)
  if (!session) {
    return redirect(307, '/signin')
  }

  return { form: await superValidate(zod(formSchema)), dinos: await db.select().from(dinosTable).where(eq(dinosTable.userId, session.user.id)) }
}

export const actions: Actions = {
  NewDino: async (event) => {
    const session = await auth.api.getSession(event.request)
    if (!session) {
      return redirect(307, '/signin')
    }

    const form = await superValidate(event, zod(formSchema))
    if (!form.valid) {
      console.error(`bad request: cannot create dino with incorrect form data`)
      return fail(400, { form })
    }
    await db.insert(dinosTable).values({
      name: form.data.name,
      userId: session.user.id,
      healthLevels: form.data.healthLevels,
      staminaLevels: form.data.staminaLevels,
      oxygenLevels: form.data.oxygenLevels,
      foodLevels: form.data.foodLevels,
      weightLevels: form.data.weightLevels,
      damageLevels: form.data.damageLevels,
    })
    console.log(`created: new dino created with success`)
    return { form }
  }
}
