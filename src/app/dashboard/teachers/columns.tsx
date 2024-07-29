"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MdCheckBoxOutlineBlank, MdDelete, MdOutlineRemoveRedEye } from "react-icons/md"
import ColumnHead from "@/components/ColumnHead";
import DateColumn from "@/components/DateColumn";
import { IUser } from "@/interfaces";

interface IProps {
  editFunc: (id: string) => void,
  deleteFunc: (id: string) => void
}



export const columnsMaker = ({ 
  editFunc, 
  deleteFunc
 }: IProps): ColumnDef<IUser>[] => [
  {
    id: "select",
    cell: ({ row }) => {    
      return (
        <button className="w-6 h-6 p-0">
          <MdCheckBoxOutlineBlank className="w-6 h-6 text-black/10" />
        </button>
      )
    },
  },
  {
    accessorKey: "propertyId",
    header: ({ column }) => <ColumnHead title="Property ID" column={column} />,
  },
  {
    accessorKey: "abssin",
    header: ({ column }) => <ColumnHead title="ABSSIN" column={column} />,

  },
  {
    accessorKey: "amount",
    header: ({ column }) => <ColumnHead title="Amount" column={column} />,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => <ColumnHead title="Currency" column={column} />,
  },
  {
    accessorKey: "paymentChannel",
    header: ({ column }) => <ColumnHead title="Payment Channel" column={column} />,
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => <ColumnHead title="Transaction ID" column={column} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <ColumnHead title="CreatedAt" column={column} />,
    cell: ({ row }) => {
      const payment = row.original
      return <DateColumn value={payment.createdAt || ''} row={row} />
    },
  },
  {
    id: "actions",
    header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex items-center justify-center" />,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center justify-center gap-2">
          <MdOutlineRemoveRedEye className="text-xl cursor-pointer text-black/40" onClick={() =>  editFunc(payment?._id || "")} />
          <MdDelete onClick={() => deleteFunc(payment._id || "")} className="text-xl cursor-pointer text-black/40" />
        </div>

      )
    },
  },
]