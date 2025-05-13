import type { ColumnDef } from "@tanstack/table-core"
import type { Tables } from "../../../database.types"
import { renderSnippet } from "$lib/components/ui/data-table"
import { createRawSnippet } from "svelte"

export type Server = Tables<'servers'>

export const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const formatter = new Intl.DateTimeFormat(
        "fr-FR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",

          hour: "2-digit",
          hour12: true,
          minute: "2-digit",

          timeZone: "UTC",
          timeZoneName: "shortGeneric",
          // timeStyle: "short",
        }
      )

      const dateSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        const createdAt = getCreatedAt()
        return {
          render: () => `<div class="text-left">${createdAt}</div>`,
        }
      })

      return renderSnippet(
        dateSnippet,
        formatter.format(Date.parse(row.getValue("created_at")))
      )
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  }
]
