"use client"

import {
  ColumnDef,
  ColumnFiltersState, // filter
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, // filter
  getPaginationRowModel, // pagination
  getSortedRowModel, // sort
  useReactTable,
} from "@tanstack/react-table"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { Pagination } from "../Pagination"

interface DataTableProps<TData, TValue> {
  title: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onPaginationChange: React.Dispatch<React.SetStateAction<{
    pageSize: number;
    pageIndex: number;
  }>>
  onSortingChange: React.Dispatch<React.SetStateAction<{
    id: string;
    desc: boolean;
  }[]>>
  pageCount: number
  pagination: {
    pageSize: number;
    pageIndex: number;
  }
  sorting: {
    id: string;
    desc: boolean;
  }[]
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  onPaginationChange,
  pagination,
  pageCount,
  sorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  // const [sorting, setSorting] = React.useState<SortingState>([]) // sort
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]) // filter
  const [globalFilter, setGlobalFilter] = React.useState('')


  // const [globalFilters, setGlobalFilters] = React.useState("") // filter
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(), // pagination
    // onSortingChange: setSorting, // sort
    getSortedRowModel: getSortedRowModel(), // sort
    onColumnFiltersChange: setColumnFilters, // filter
    onGlobalFilterChange: setGlobalFilter, // GLOBAL FILTER
    getFilteredRowModel: getFilteredRowModel(), // filter
    manualPagination: true, // server pagination
    onPaginationChange, // server pagination
    pageCount,
    manualSorting: true,
    onSortingChange,
    state: {
      sorting, // sort
      columnFilters, // filter
      globalFilter, // filter
      pagination, // sever side
    },
  })


  return (
    <div className="p-5 text-sm bg-white rounded-lg font-inter">
      {/* <div className="flex flex-col justify-between gap-2 pb-4 md:flex-row md:items-center md:gap-6">
        <h3 className="text-base font-semibold text-black/60">{title}</h3>
        <div className="relative flex items-center">
          <MdSearch className="absolute text-black/50 text-xl top-1.5 left-2" />
          <input
            placeholder="Search"
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(String(e.target.value))}
            className="max-w-sm p-1 px-2 pl-10 border rounded-md outline-none focus:border-black/60 hover:border-black/60 bg-inherit"
          />
        </div>
      </div> */}
      {/* <div className="flex items-center py-4">
        <input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id}  
                      style={{
                        width: header.index === 0 ? 20 : "auto",
                      }}
                      // {
                      //   ...(header.column.getCanSort()
                      //   ? { onClick: header.column.getToggleSortingHandler() }
                      //   : {})
                      // }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                      )}                
                      {/* {header.column.getIsSorted() === "asc" ? (
                        <span> 🔼</span>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <span> 🔽</span>
                      ) : null} */}

                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
     
      <Pagination tableLib={table} />
    </div>
  )

}
