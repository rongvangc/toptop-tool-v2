"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import useToptopStore from "@/store/toptop";
import { Printer } from "lucide-react";
import { useCallback } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const customer = row.original as any;

  const { setPrintData } = useToptopStore();

  const handlePrintData = useCallback(() => {
    const currentOrder = localStorage.getItem("orderList");
    const parsedOrder = currentOrder ? JSON.parse(currentOrder) : {};
    const orderLength = Object.keys(parsedOrder).length;

    if (customer?.userId && customer?.userId in parsedOrder) {
      setPrintData({
        ...customer,
        currentOrderNumber: parsedOrder[customer?.userId],
      } as unknown as CommentTopTopData);
    } else {
      localStorage.setItem(
        "orderList",
        JSON.stringify({
          ...parsedOrder,
          [customer?.userId as string]: orderLength + 1,
        })
      );
      setPrintData({
        ...customer,
        currentOrderNumber:
          customer?.userId && customer?.userId in parsedOrder
            ? parsedOrder[customer?.userId]
            : orderLength + 1,
      } as unknown as CommentTopTopData);
    }
  }, [customer, setPrintData]);

  return (
    <Button variant="ghost" onClick={handlePrintData}>
      <Printer className="cursor-pointer w-5 text-blue-500" />
    </Button>
  );

  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button
  //         variant="ghost"
  //         className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
  //       >
  //         <DotsHorizontalIcon className="h-4 w-4" />
  //         <span className="sr-only">Open menu</span>
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent align="end" className="w-[160px]">
  //       <DropdownMenuItem>Edit</DropdownMenuItem>
  //       <DropdownMenuItem>Favorite</DropdownMenuItem>
  //       <DropdownMenuSeparator />
  //       <DropdownMenuSub>
  //         <DropdownMenuSubTrigger>Options</DropdownMenuSubTrigger>
  //         <DropdownMenuSubContent>
  //           <DropdownMenuRadioGroup value={options[0].value}>
  //             {options.map((label) => (
  //               <DropdownMenuRadioItem key={label.value} value={label.value}>
  //                 {label.label}
  //               </DropdownMenuRadioItem>
  //             ))}
  //           </DropdownMenuRadioGroup>
  //         </DropdownMenuSubContent>
  //       </DropdownMenuSub>
  //       <DropdownMenuSeparator />
  //       <DropdownMenuItem>
  //         Delete
  //         <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
  //       </DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}
