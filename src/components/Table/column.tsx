"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react" 
import { MdCheckBoxOutlineBlank } from "react-icons/md"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
import { CgSortZa, CgSortAz } from "react-icons/cg";
export const columns: ColumnDef<Payment>[] = [
    {
        id: "actions",
        // header: ({ column }) => {
        //   return (
        //   <span className="w-4 h-8 p-0"></span>
        //   )
        // },
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <button className="w-6 h-6 p-0">
              <MdCheckBoxOutlineBlank className="w-6 h-6 text-black/10" />
            </button>
            // <button className="w-4 h-8 p-0">
            //     <MoreHorizontal className="w-4 h-4" />
            //   </button>
            // <div>
            //   <div>
            //     <button className="w-8 h-8 p-0">
            //       <MoreHorizontal className="w-4 h-4" />
            //     </button>
            //   </div>
            //   {/* <div>
            //     <span>Actions</span>
            //     <button
            //       onClick={() => navigator.clipboard.writeText(payment.id)}
            //     >
            //       Copy payment ID
            //     </button>
            //     <span className="border-b" />
            //     <span>View customer</span>
            //     <span>View payment details</span>
            //   </div> */}
            // </div>
          )
        },
      },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    // sort
    header: ({ column }) => {
        return (
          <button
            className="flex items-center font-medium text-black/70"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            {
              !column.getIsSorted() ? 
                <ArrowUpDown className="w-4 h-4 ml-2" />
              :
              column.getIsSorted() === "asc" ?
                <CgSortZa className="w-6 h-6 ml-1" />
              :
                <CgSortAz className="w-6 h-6 ml-1" />
            }
          </button>
        )
    },
    //sort
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button 
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        {
              !column.getIsSorted() ? 
                <ArrowUpDown className="w-4 h-4 ml-2" />
              :
              column.getIsSorted() === "asc" ?
                <CgSortZa className="w-6 h-6 ml-1" />
              :
                <CgSortAz className="w-6 h-6 ml-1" />
            }
      </button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return (
        <div 
          className="font-medium"
        >
          {formatted}
        </div>
      )
    },
  },
]