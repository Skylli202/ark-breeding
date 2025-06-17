import { fail, type RequestEvent } from "@sveltejs/kit"
import { auth } from "../auth"
import { db } from "../db"
import { dinosTable } from "../schema"
import { eq } from "drizzle-orm"

// NOTE:
// I wanted to test the pattern described at the link below. Not sure I'm gonna keep this pattern.
// I think its a net loss on locality of behavior and typesafety, but... we shall see.
// https://www.sveltepatterns.dev/how-to-create-a-reusable-form#why-repeat-the-form-action-on-multiple-endpoints-instead-of-reusing-the-endpoint
export const DeleteDino = async (event: RequestEvent) => {
  const formData = await event.request.formData()
  let dinoId = formData.get('id')
  if (dinoId === null) {
    console.error(`bad request: connot find dino ID (key: "id") in formData.`, formData)
    return fail(400)
  }
  const session = await auth.api.getSession(event.request)
  if (!session) {
    console.error(`unauthorized: no session for the request.`)
    return fail(401)
  }
  const dinos = await db.select().from(dinosTable).where(eq(dinosTable.id, dinoId as unknown as string))

  if (dinos.length != 1) {
    console.error(`not found: dino ID "${dinoId}" does not exist.`)
    return fail(404)
  }

  if (dinos[0].userId !== session.user.id) {
    console.error(`unauthorized: user is not the owner of that dino.`)
    return fail(401)
  }


  const deletedDinos = await db.delete(dinosTable).where(eq(dinosTable.id, dinoId as unknown as string)).returning({ id: dinosTable.id })
  console.log(`success: deleted the dinos: [${deletedDinos.map(d => d.id).join(', ')}]`)
  return
}
