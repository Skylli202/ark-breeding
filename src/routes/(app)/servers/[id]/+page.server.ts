import { auth } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/schema'
import { eq } from 'drizzle-orm'

export const actions = {
  delete: async (event) => {
    const session = await auth.api.getSession(event.request)
    if (!session) {
      console.error(`unauthorized: no session for the request.`)
      return fail(401)
    }
    const srvs = await db.select().from(schema.serversTable).where(eq(schema.serversTable.id, event.params.id as unknown as number))

    if (srvs.length != 1) {
      console.error(`not found: server ID ${event.params.id} does not exist.`)
      return fail(404)
    }

    if (srvs[0].userId !== session.user.id) {
      console.error(`unauthorized: user is not the owner of that server.`)
      return fail(401)
    }

    await db.delete(schema.serversTable).where(eq(schema.serversTable.id, event.params.id as unknown as number))
    return
  }
} satisfies Actions; 
