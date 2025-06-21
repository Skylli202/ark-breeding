import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { formJoinClanSchema, formNewClanSchema } from './schema.js'
import { auth } from '$lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db.js'
import { clansTable, usersToClansTable } from '$lib/server/schema.js'
import { eq } from 'drizzle-orm'

export const load = async (event) => {
  const session = await auth.api.getSession(event.request)
  if (!session) {
    return redirect(307, '/signin')
  }

  let clans = await db
    .select()
    .from(clansTable)
    .rightJoin(usersToClansTable, eq(clansTable.id, usersToClansTable.clanId))
    .where(eq(usersToClansTable.userId, session.user.id))

  const clanIds = clans.map(c => c.clans_table?.id).filter(s => s !== null && s !== undefined)

  // For my dummies, that's just gettin' all clans who the user is part of.
  // And cuz' I'm a dummy myself, I'm doing it in two queries.
  let clansAndUsers = await db
    .query
    .clansTable
    .findMany({
      where: ({ id }, { inArray }) => inArray(id, clanIds),
      with: {
        usersToClans: {
          where: ({ userId }, { eq }) => eq(userId, session.user.id),
          with: { user: true }
        }
      }
    })

  return {
    formNewClan: await superValidate(zod(formNewClanSchema)),
    formJoinClan: await superValidate(zod(formJoinClanSchema)),
    clans: clansAndUsers,
  }
}

export const actions = {
  DeleteClan: async (event) => {
    const session = await auth.api.getSession(event.request)
    if (!session) {
      console.error(`unauthorized: request denied on create clan`)
      return fail(401)
    }

    const formData = await event.request.formData()
    const id = formData.get('id')
    if (id === null) {
      console.error(`bad request: request formData do not contains the correct data.`)
      return fail(400)
    } else if (id instanceof File) {
      console.error(`bad request: request formData do not contains the correct data type.`)
      return fail(400)
    }

    const { ownerId } = await db.query.clansTable.findFirst({
      columns: { ownerId: true },
      where: eq(clansTable.id, id),
    }) ?? { ownerId: 0 }

    if (ownerId === 0) {
      console.error(`not found: provided ID do not exists.`)
      return fail(404)
    } else if (ownerId === session.user.id) {
      // Multiples queries are needed. First delete all the rows in the join table then delete the clan.
      const isTxSuccessful = await db.transaction(async tx => {
        // TODO:
        const rows = await tx.delete(usersToClansTable).where(eq(usersToClansTable.clanId, id)).returning()
        const deletedClans = await tx.delete(clansTable).where(eq(clansTable.id, id)).returning()
        if (deletedClans.length > 1) {
          console.error(`SQL delete statement affected ${deletedClans.length} rows. It should have affected only 1 row. -> rollback!`)
          tx.rollback()
          return false
        } else if (deletedClans[0].id !== id) {
          const deletedClan = deletedClans[0]
          console.error(`SQL delete statement returned clan ID [${deletedClan.id}]; provided ID to delete is [${id}]. ${deletedClan.id} != ${id} -> rollback!`)
          tx.rollback()
          return false
        }
        console.log(`Clan [${id}] and its rows (${rows.length} affected rows) in the join table has successfully been deleted.`)
        return true
      })

      if (!isTxSuccessful) {
        console.error(`internal server error: DB transaction failed. See previous logs.`)
        return fail(500)
      }

      return {}
    } else {
      console.error(`unauthorized: user [${session.user.id}] "${session.user.email}" tried to delete the clan [${id}] but is NOT the owner.`)
      return fail(401)
    }
  },
  NewClan: async (event) => {
    const session = await auth.api.getSession(event.request)
    if (!session) {
      console.error(`unauthorized: request denied on create clan`)
      return fail(401)
    }

    const form = await superValidate(event, zod(formNewClanSchema))
    if (!form.valid) {
      console.error(`bad request: cannot create clan with incorrect form data`)
      return fail(400, { form })
    }

    await db.transaction(async (tx) => {
      let [clan] = await tx.insert(clansTable).values({ name: form.data.name }).returning()
      await tx.insert(usersToClansTable).values({ clanId: clan.id, userId: session.user.id })
      console.log(`successfully inserted a new clan in database: ${JSON.stringify(clan)}`)
    })

    return { form }
  },
  JoinClan: async (event) => {
    const session = await auth.api.getSession(event.request)
    if (!session) {
      console.error(`unauthorized: request denied on create clan`)
      return fail(401)
    }

    const form = await superValidate(event, zod(formJoinClanSchema))
    if (!form.valid) {
      console.error(`bad request: cannot create clan with incorrect form data`)
      return fail(400, { form })
    }

    return fail(500, { message: 'Internal Server Error: form action "JoinClan" is not implemented.' })
  }
}
