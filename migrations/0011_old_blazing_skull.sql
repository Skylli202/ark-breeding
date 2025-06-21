CREATE TABLE "join_clan_codes_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clan_id" uuid NOT NULL,
	"inviter_id" text NOT NULL,
	"invitee_ids" text[] DEFAULT '{}',
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "join_clan_codes_table" ADD CONSTRAINT "join_clan_codes_table_clan_id_clans_table_id_fk" FOREIGN KEY ("clan_id") REFERENCES "public"."clans_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "join_clan_codes_table" ADD CONSTRAINT "join_clan_codes_table_inviter_id_users_table_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;