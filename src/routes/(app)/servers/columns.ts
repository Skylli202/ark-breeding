import type { ColumnDef } from "@tanstack/table-core";
import type { SelectServer } from "../../schema";
import { renderComponent } from "$lib/components/ui/data-table/index"
import DataTableActions from "./data-table-actions.svelte"

export const columns: ColumnDef<SelectServer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id });
    },
  },
];
