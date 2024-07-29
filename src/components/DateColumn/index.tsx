import { formatDate3 } from '@/utils/date'
import { Row } from '@tanstack/react-table'
import React from 'react'

interface IProps<T> {
    value: string 
    row?: Row<T>
    className?: string
}

const DateColumn = <T,>({ row, className, value }: IProps<T>) => {
    const rowItem = row?.original
  return (
    <div className={ className ? className : "flex items-center gap-1 font-medium text-black/70 whitespace-nowrap"}>
        {formatDate3(value)}
    </div>
  )
}

export default DateColumn