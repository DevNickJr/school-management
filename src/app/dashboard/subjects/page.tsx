"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IPaginatedResponse, ISubject } from '@/interfaces'
import { MdAdd } from 'react-icons/md'
import NoResult from '@/components/NoResult'
import { Button } from '@/components/ui/button'
import { subjectColumnnsMaker } from './_components/columns'
import DataTable from '@/components/Table/data-table'
import AddSubjectDialog from './_components/AddSubject.dialog'
import { apiGetSubjects } from '@/services/SubjectService'


const Subjects = () => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  
  const { data: subjects, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<ISubject[]>>({
      api: apiGetSubjects,
      param: {
          pagination: { page, limit },
          sort: { field, order },
      },
      key: ["Subjects", String(page), String(limit)],
      requireAuth: true
  })

  const columns = subjectColumnnsMaker()

  return (
    <div className=''>
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Subjects</h2>
            <AddSubjectDialog refetch={refetch}>
                <Button className='flex items-center gap-2 p-2 px-4 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
                    <MdAdd className="text-lg text-white" />
                    <span>Add Subject</span>
                </Button>
            </AddSubjectDialog>
        </div>
        {
        (subjects?.totalDocs && subjects?.totalDocs > 0) ?
            <DataTable
                title="Subjects"
                columns={columns} 
                data={subjects?.docs ?? []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(subjects?.totalPages || 0)}
                totalDocs={Number(subjects?.totalDocs)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                :
            <AddSubjectDialog refetch={refetch}>
                <NoResult
                  isLoading={isLoading}
                  image={HouseImg}
                  desc='No Subject Added' 
                  buttonText='Add Subject'
                  onClick={() => ''}
                />
            </AddSubjectDialog>
        }
    </div>
  )
}

export default Subjects