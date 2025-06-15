import { renderComponent } from "$lib/components/ui/data-table";
import type { SelectDino } from "$lib/server/schema";
import type { ColumnDef } from "@tanstack/table-core";
import DataTableActions from "./data-table-actions.svelte"
import DataTableHealthLevelsButton from "$lib/components/ui/data-table/data-table-basic-header-button.svelte";

export const columns: ColumnDef<SelectDino>[] = [
  {
    header: 'Name',
    accessorKey: 'name'
  },
  {
    header: ({ column }) =>
      renderComponent(DataTableHealthLevelsButton, {
        title: 'Health Levels',
        onclick: column.getToggleSortingHandler(),
      }),
    accessorKey: 'healthLevels',
  },
  {
    header: ({ column }) =>
      renderComponent(DataTableHealthLevelsButton, {
        title: 'Stamina Levels',
        onclick: column.getToggleSortingHandler(),
      }),
    accessorKey: 'staminaLevels'
  },
  {
    header: ({ column }) =>
      renderComponent(DataTableHealthLevelsButton, {
        title: 'Oxygen Levels',
        onclick: column.getToggleSortingHandler(),
      }),
    accessorKey: 'oxygenLevels'
  },
  {
    header: ({ column }) =>
      renderComponent(DataTableHealthLevelsButton, {
        title: 'Food Levels',
        onclick: column.getToggleSortingHandler(),
      }),
    accessorKey: 'foodLevels'
  },
  {
    header: ({ column }) =>
      renderComponent(DataTableHealthLevelsButton, {
        title: 'Weight Levels',
        onclick: column.getToggleSortingHandler(),
      }),
    accessorKey: 'weightLevels'
  },
  {
    header: ({ column }) =>
      renderComponent(DataTableHealthLevelsButton, {
        title: 'Damage Levels',
        onclick: column.getToggleSortingHandler(),
      }),
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

