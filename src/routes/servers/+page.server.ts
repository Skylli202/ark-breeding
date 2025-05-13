export async function load(events) {
  let { data: servers, error } = await events.locals.supabase
    .from('servers')
    .select('*')

  if (error) {
    console.error(error)
  }

  if (servers == null) { servers = [] }
  console.log(`${servers.length} servers loaded from supabase.`)
  return { servers }
}
