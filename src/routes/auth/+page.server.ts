import { invalidateAll } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  // login: async (event) => {
  //   // TODO log the user in
  // },
  logout: async (event) => {
    const { error } = await event.locals.supabase.auth.signOut()
    if (error) {
      console.error(`unable to signOut user: ${error.code} ${error.message}`, error)
    }
    redirect(301, '/')
  }
} satisfies Actions;
