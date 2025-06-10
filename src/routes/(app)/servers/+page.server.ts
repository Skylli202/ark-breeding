import type { Actions } from './$types';
import { db } from '$lib/db';
import { serversTable } from '$lib/schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from './schema';
import { fail } from '@sveltejs/kit';


export const load = async () => {
  const servers = await db.select().from(serversTable)
  return { form: await superValidate(zod(formSchema)), servers }
}

export const actions = {
  NewServer: async (event) => {
    const form = await superValidate(event, zod(formSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    await db.insert(serversTable).values({ name: form.data.name, userId: 1 })
    return { form }
  }
} satisfies Actions;
