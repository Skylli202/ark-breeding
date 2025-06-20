import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { DATABASE_URL } from "$env/static/private";
import { config } from "dotenv";
import * as schema from '$lib/server/schema'

config({ path: ".env" })
const pool = new Pool({ connectionString: DATABASE_URL })
export const db = drizzle(pool, { schema: schema })
