import { db } from '$lib/server/db.js'
import { speciesTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const GET = async ({ params }) => {
  // I do not think I need auth to query this data...
  const { entityId } = params
  const species = await db.query.speciesTable.findFirst({ where: eq(speciesTable.entityId, entityId) })
  return json(species)
}
