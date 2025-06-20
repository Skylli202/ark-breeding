CREATE TABLE "clans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usersToClansTable" (
	"user_id" text NOT NULL,
	"clan_id" uuid NOT NULL,
	CONSTRAINT "usersToClansTable_user_id_clan_id_pk" PRIMARY KEY("user_id","clan_id")
);
--> statement-breakpoint
ALTER TABLE "usersToClansTable" ADD CONSTRAINT "usersToClansTable_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersToClansTable" ADD CONSTRAINT "usersToClansTable_clan_id_clans_id_fk" FOREIGN KEY ("clan_id") REFERENCES "public"."clans"("id") ON DELETE no action ON UPDATE no action;