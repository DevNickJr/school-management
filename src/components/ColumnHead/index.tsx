import { Column } from '@tanstack/react-table'
import React, { ReactNode } from 'react'
import { CgSortAz } from 'react-icons/cg'

interface IProps<T> {
    title: string | ReactNode
    column: Column<T, unknown>
    className?: string
}

const ColumnHead = <T,>({ column, className, title }: IProps<T>) => {

  return (
    <div 
    className={ className ? className : "flex items-center gap-1 font-medium text-black/70 whitespace-nowrap"}
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <CgSortAz className="w-6 h-6 ml-1" />
    {/* {
          !column.getIsSorted() ? 
            <ArrowUpDown className="w-4 h-4 ml-2" />
          :
          column.getIsSorted() === "asc" ?
            <CgSortZa className="w-6 h-6 ml-1" />
          :
            <CgSortAz className="w-6 h-6 ml-1" />
        } */}
  </div>
  )
}

export default ColumnHead