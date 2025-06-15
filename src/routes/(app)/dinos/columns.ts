import { renderComponent } from "$lib/components/ui/data-table";
import type { SelectDino } from "$lib/server/schema";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte"

export const columns: ColumnDef<SelectDino>[] = [
  {
    header: 'Name',
    accessorKey: 'name'
  },
  {
    header: 'HP',
    accessorKey: 'healthLevels'
  },
  {
    header: 'ST',
    accessorKey: 'staminaLevels'
  },
  {
    header: 'OX',
    accessorKey: 'oxygenLevels'
  },
  {
    header: 'FO',
    accessorKey: 'foodLevels'
  },
  {
    header: 'WE',
    accessorKey: 'weightLevels'
  },
  {
    header: 'DM',
    accessorKey: 'damageLevels'
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id });
    },
  },
];

