import { auth } from '$lib/auth'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (events) => {
  const session = await auth.api.getSession({ headers: events.request.headers })
  if (!session) {
    throw redirect(307, '/signin')
  }
  console.log('I\'ve got a session for ya!', session)
  return { session }
}
