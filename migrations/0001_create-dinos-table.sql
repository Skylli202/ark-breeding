CREATE TABLE "dinos_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dinos_table" ADD CONSTRAINT "dinos_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;