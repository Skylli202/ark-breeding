import { DATABASE_URL } from "$env/static/private";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" })
const sql = neon(DATABASE_URL)
export const db = drizzle({ client: sql })
