import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { account, session, usersTable, verification } from "./schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // Please don't be an asshole and sign my user right away
    autoSignIn: true,
    // I'm not a real website, I do not really care about email..
    requireEmailVerification: false
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      account: account,
      session: session,
      verification: verification,
      user: usersTable
    }
  })
})
