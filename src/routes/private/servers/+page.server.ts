import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
  depends('supabase:db:notes')
  const { data: servers } = await supabase.from('servers').select('id,name').order('id')
  return { servers: servers ?? [] }
}
