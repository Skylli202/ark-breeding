ALTER TABLE "dinos_table" DROP CONSTRAINT "dinos_table_entity_id_species_table_entity_id_fk";
--> statement-breakpoint
ALTER TABLE "dinos_table" ADD CONSTRAINT "dinos_table_entity_id_species_table_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."species_table"("entity_id") ON DELETE no action ON UPDATE cascade;