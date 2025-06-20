ALTER TABLE "clans" RENAME TO "clans_table";--> statement-breakpoint
ALTER TABLE "usersToClansTable" RENAME TO "users_to_clans_table";--> statement-breakpoint
ALTER TABLE "users_to_clans_table" DROP CONSTRAINT "usersToClansTable_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_clans_table" DROP CONSTRAINT "usersToClansTable_clan_id_clans_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_clans_table" DROP CONSTRAINT "usersToClansTable_user_id_clan_id_pk";--> statement-breakpoint
ALTER TABLE "users_to_clans_table" ADD CONSTRAINT "users_to_clans_table_user_id_clan_id_pk" PRIMARY KEY("user_id","clan_id");--> statement-breakpoint
ALTER TABLE "users_to_clans_table" ADD CONSTRAINT "users_to_clans_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_clans_table" ADD CONSTRAINT "users_to_clans_table_clan_id_clans_table_id_fk" FOREIGN KEY ("clan_id") REFERENCES "public"."clans_table"("id") ON DELETE no action ON UPDATE no action;