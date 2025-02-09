"use client";

import { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { DataTableColumnHeader } from "../table/data-table-column-header";
import { DataTableRowActions } from "./comment-table-row-action";

export const commmentToptopColumns = (
  currentOrderNumber: number
): ColumnDef<CommentTopTopData>[] => {
  return [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "uniqueId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px] font-bold text-green-600">
          {row.getValue("uniqueId")}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nickname",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nick name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("nickname")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Thời gian" />
      ),
      cell: ({ row }) => {
        const timestamp = row.getValue("createTime") as number;
        const createTime = new Date(+timestamp);
        const formattedDate = format(createTime, "HH:mm dd/MM/yyyy");

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {formattedDate}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "comment",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Comment" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium flex items-center gap-1">
              {row.getValue("comment")}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Status" />
    //   ),
    //   cell: ({ row }) => {
    //     const status = customerStatus.find(
    //       (status) => status.value === row.getValue("status")
    //     );

    //     const colorSwitch =
    //       status?.value === GeneralStatus.Active
    //         ? "text-green-500"
    //         : "text-red-500";

    //     if (!status) {
    //       return null;
    //     }

    //     return (
    //       <div className="flex w-[100px] items-center">
    //         {status.icon && (
    //           <status.icon className={`mr-1 h-4 w-4 ${colorSwitch}`} />
    //         )}
    //         <span className={`${colorSwitch} font-medium text-sm`}>
    //           {status.label}
    //         </span>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return value.includes(row.getValue(id));
    //   },
    // },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="min-w-10 flex justify-center">
          <DataTableRowActions
            row={row}
            currentOrderNumber={currentOrderNumber}
          />
        </div>
      ),
    },
  ];
};
