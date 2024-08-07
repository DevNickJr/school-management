"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IPaginatedResponse, IStudent } from '@/interfaces'
import { MdAdd } from 'react-icons/md'
import NoResult from '@/components/NoResult'
import { Button } from '@/components/ui/button'
import { studentColumnnsMaker } from './_components/columns'
import DataTable from '@/components/Table/data-table'
import AddStudentDialog from './_components/AddStudent.dialog'
import { apiGetStudents } from '@/services/StudentService'


const Students = () => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  
  const { data: students, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<IStudent[]>>({
      api: apiGetStudents,
      param: {
          pagination: { page, limit },
          sort: { field, order },
      },
      key: ["Students", String(page), String(limit)],
      requireAuth: true
  })

  const columns = studentColumnnsMaker()

  return (
    <div className=''>
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Students</h2>
            <AddStudentDialog refetch={refetch}>
                <Button className='flex items-center gap-2 p-2 px-4 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
                    <MdAdd className="text-lg text-white" />
                    <span>Add Student</span>
                </Button>
            </AddStudentDialog>
        </div>
        {
        (students?.totalDocs && students?.totalDocs > 0) ?
            <DataTable
                title="Student"
                columns={columns} 
                data={students?.docs ?? []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(students?.totalPages || 0)}
                totalDocs={Number(students?.totalDocs)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                :
            <AddStudentDialog refetch={refetch}>
                <NoResult
                  isLoading={isLoading}
                  image={HouseImg}
                  desc='No Student Added' 
                  buttonText='Add Student'
                  onClick={() => ''}
                />
            </AddStudentDialog>
        }
    </div>
  )
}

export default Students