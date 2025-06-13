import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { serversTable } from '$lib/server/schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';


export const load = async (event) => {
  const session = await auth.api.getSession({ headers: event.request.headers })
  if (!session) {
    throw redirect(307, '/signin')
  }

  const servers = await db.select().from(serversTable)
  return { form: await superValidate(zod(formSchema)), servers }
}

export const actions = {
  NewServer: async (event) => {
    const session = await auth.api.getSession({ headers: event.request.headers })
    if (!session) {
      throw redirect(307, '/signin')
    }

    const form = await superValidate(event, zod(formSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    await db.insert(serversTable).values({ name: form.data.name, userId: session.user.id })
    return { form }
  }
} satisfies Actions;
