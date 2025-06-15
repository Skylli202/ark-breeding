CREATE TABLE "species_table" (
	"entity_id" text PRIMARY KEY NOT NULL,
	"common_name" text
);
INSERT INTO "species_table" (
  entity_id, common_name
) VALUES ('Unknown', 'Unknown');
--> statement-breakpoint
ALTER TABLE "dinos_table" ADD COLUMN "entity_id" text DEFAULT 'Unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "dinos_table" ADD CONSTRAINT "dinos_table_entity_id_species_table_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."species_table"("entity_id") ON DELETE no action ON UPDATE cascade;
