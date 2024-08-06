"use client"
import React, { useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IPaginatedResponse, ITeacher } from '@/interfaces'
import { MdAdd } from 'react-icons/md'
import NoResult from '@/components/NoResult'
import AddTeacherDialog from './_components/AddTeacher.dialog'
import { Button } from '@/components/ui/button'
import { apiGetTeachers } from '@/services/TeacherServices'
import { teacherColumnsMaker } from './columns'
import DataTable from '@/components/Table/data-table'


const Teachers = () => {
  const [deletePaymentId, setDeletePaymentId] = useState('')
  const [successModalIsOpen, setSuccessModalOpen] = useState(false)
  const [addModalIsOpen, setAddModalOpen] = useState(false)
  const [editPayment, setEditPayment] = useState('')
  
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  
  const { data: teachers, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<ITeacher[]>>({
      api: apiGetTeachers,
      param: {
          pagination: { page, limit },
          sort: { field, order },
      },
      key: ["Teachers", String(page), String(limit)],
      requireAuth: true
  })

  const columns = teacherColumnsMaker()

  return (
    <div className=''>
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Teachers</h2>
            <AddTeacherDialog refetch={refetch}>
                <Button className='flex items-center gap-2 p-2 px-4 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
                    <MdAdd className="text-lg text-white" />
                    <span>Add Teacher</span>
                </Button>
            </AddTeacherDialog>
        </div>
        {
        (teachers?.totalDocs && teachers?.totalDocs > 0) ?
            <DataTable
                title="teachers"
                columns={columns} 
                data={teachers?.docs ?? []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(teachers?.totalPages || 0)}
                totalDocs={Number(teachers?.totalDocs)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                :
            <AddTeacherDialog refetch={refetch}>
                <NoResult
                  isLoading={isLoading}
                  image={HouseImg}
                  desc='No Teacher Added' 
                  buttonText='Add Teacher'
                  onClick={() => setAddModalOpen(true)}
                />
            </AddTeacherDialog>
        }
    </div>
  )
}

export default Teachers