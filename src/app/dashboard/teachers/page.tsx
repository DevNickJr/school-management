"use client"
import { DataTable } from '@/components/Table/data-table'
import React, { useState } from 'react'
import { columnsMaker } from './columns'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import { apiGetUsers } from '@/services/AuthService'
import useFetch from '@/hooks/useFetch'
import { IResponseData, IUser } from '@/interfaces'
import Button from '@/components/Button'
import { MdAdd } from 'react-icons/md'
import NoResult from '@/components/NoResult'



const Teachers = () => {
  const [deletePaymentId, setDeletePaymentId] = useState('')
  const [successModalIsOpen, setSuccessModalOpen] = useState(false)
  const [addModalIsOpen, setAddModalOpen] = useState(false)
  const [editPayment, setEditPayment] = useState('')
  
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  
  const { data: teachers, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IResponseData<IUser[]>>({
      api: apiGetUsers,
      param: {
          pagination: { page, limit },
          sort: { field, order },
      },
      key: ["Teachers", String(page), String(limit)],
      requireAuth: true
  })

  const columns = columnsMaker({
      editFunc: (id: string) => setEditPayment(id),
      deleteFunc: (id: string) => setDeletePaymentId(id),
  })

  return (
    <div className=''>
    <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
        <h2 className='text-3xl font-bold text-black/80'>Teachers</h2>
        <Button onClick={() => setAddModalOpen(true)} className='flex items-center gap-2 p-2 px-4 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
            <MdAdd className="text-lg text-white" />
            <span>Add Teacher</span>
        </Button>
    </div>
        {
       (teachers?.totalItems && teachers?.totalItems > 0) ?
            <DataTable 
                title="teachers"
                columns={columns} 
                data={teachers?.items || []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(teachers?.totalPages || 0)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                        :
            <NoResult
              isLoading={isLoading}
              image={HouseImg}
              desc='No Teacher Added' 
              buttonText='Add Teacher'
              onClick={() => setAddModalOpen(true)}
            />
          }
      </div>
  )
}

export default Teachers