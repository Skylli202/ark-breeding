import { relations } from 'drizzle-orm';
import { serial, pgTable, text, timestamp, boolean, uuid, integer, primaryKey } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});
export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToClans: many(usersToClansTable),
  ownedClans: many(clansTable),
}))
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const serversTable = pgTable('servers_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});
export type InsertServer = typeof serversTable.$inferInsert;
export type SelectServer = typeof serversTable.$inferSelect;

export const dinosTable = pgTable('dinos_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  entityId: text('entity_id').default('Unknown').notNull().references(() => speciesTable.entityId, { onDelete: 'no action', onUpdate: 'cascade' }),
  userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  healthLevels: integer('health_levels').notNull(),
  staminaLevels: integer('stamina_levels').notNull(),
  oxygenLevels: integer('oxygen_levels').notNull(),
  foodLevels: integer('food_levels').notNull(),
  weightLevels: integer('weight_levels').notNull(),
  damageLevels: integer('damage_levels').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
})
export type InsertDino = typeof dinosTable.$inferInsert;
export type SelectDino = typeof dinosTable.$inferSelect;

export const speciesTable = pgTable('species_table', {
  entityId: text('entity_id').primaryKey(), // Ark BP
  commonName: text('common_name'),
})
export type InsertSpecies = typeof speciesTable.$inferInsert;
export type SelectSpecies = typeof speciesTable.$inferSelect;

export const clansTable = pgTable('clans_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  ownerId: text('owner_id').notNull().default('XXX'),
})
export const clansRelations = relations(clansTable, ({ many, one }) => ({
  usersToClans: many(usersToClansTable),
  owner: one(usersTable, {
    fields: [clansTable.ownerId],
    references: [usersTable.id],
  })
}));
export type InsertClan = typeof clansTable.$inferInsert
export type SelectClan = typeof clansTable.$inferSelect

export const usersToClansTable = pgTable(
  'users_to_clans_table',
  {
    userId: text('user_id').notNull().references(() => usersTable.id),
    clanId: uuid('clan_id').notNull().references(() => clansTable.id),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.clanId] })
  ]
)
export const usersToClansRelations = relations(usersToClansTable, ({ one }) => ({
  clan: one(clansTable, { fields: [usersToClansTable.clanId], references: [clansTable.id] }),
  user: one(usersTable, { fields: [usersToClansTable.userId], references: [usersTable.id], }),
}))

// BetterAuth tables
export const sessionsTable = pgTable("sessions_table", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' })
});
export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;

export const accountsTable = pgTable("accounts_table", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});
export type InsertAccount = typeof accountsTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;

export const verificationsTable = pgTable("verifications_table", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});
export type InsertVerification = typeof verificationsTable.$inferInsert;
export type SelectVerification = typeof verificationsTable.$inferSelect;
