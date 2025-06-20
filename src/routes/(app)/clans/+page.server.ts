import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { formSchema } from './schema.js'
import { auth } from '$lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db.js'
import { clansTable, usersToClansTable } from '$lib/server/schema.js'
import { eq } from 'drizzle-orm'
import { neon, Pool } from '@neondatabase/serverless'
import { DATABASE_URL } from '$env/static/private'

export const load = async (event) => {
  const session = await auth.api.getSession(event.request)
  if (!session) {
    return redirect(307, '/signin')
  }

  let Clans = await db
    .select()
    .from(clansTable)
    .rightJoin(usersToClansTable, eq(clansTable.id, usersToClansTable.clanId))
    .where(eq(usersToClansTable.userId, session.user.id))

  const tmp = Clans.map(c => c.clans_table?.id).filter(s => s !== null && s !== undefined)

  // For my dummies, that's just gettin' all clans who the user is part of.
  // And cuz' I'm a dummy myself, I'm doing it in two queries.
  let clans = await db
    .query
    .clansTable
    .findMany({
      where: ({ id }, { inArray }) => inArray(id, tmp),
      with: {
        usersToClans: {
          where: ({ userId }, { eq }) => eq(userId, session.user.id),
          with: { user: true }
        }
      }
    })

  return {
    form: await superValidate(zod(formSchema)),
    clans,
  }
}

export const actions = {
  NewClan: async (event) => {
    const session = await auth.api.getSession(event.request)
    if (!session) {
      console.error(`unauthorized: request denied on create clan`)
      return fail(401)
    }

    const form = await superValidate(event, zod(formSchema))
    if (!form.valid) {
      console.error(`bad request: cannot create clan with incorrect form data`)
      return fail(400, { form })
    }

    await db.transaction(async (tx) => {
      let [clan] = await tx.insert(clansTable).values({ name: form.data.name }).returning()
      await tx.insert(usersToClansTable).values({ clanId: clan.id, userId: session.user.id }).returning()
      console.log(`successfully inserted a new clan in database: ${JSON.stringify(clan)}`)
    })

    return { form }
  }
}
