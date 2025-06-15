import type { ColumnDef } from "@tanstack/table-core";
import type { SelectServer } from "$lib/server/schema";
import { renderComponent } from "$lib/components/ui/data-table/index"
import DataTableActions from "./data-table-actions.svelte"
import DataTableBasicHeaderButton from "$lib/components/ui/data-table/data-table-basic-header-button.svelte";

export const columns: ColumnDef<SelectServer>[] = [
  {
    accessorKey: "id",
    header: ({ column }) =>
      renderComponent(DataTableBasicHeaderButton, {
        title: 'ID',
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    accessorKey: "name",
    header: ({ column }) =>
      renderComponent(DataTableBasicHeaderButton, {
        title: 'Name',
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id });
    },
  },
];
