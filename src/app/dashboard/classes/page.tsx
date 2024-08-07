"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IPaginatedResponse, IClass } from '@/interfaces'
import { MdAdd } from 'react-icons/md'
import NoResult from '@/components/NoResult'
import { Button } from '@/components/ui/button'
import { classColumnnsMaker } from './_components/columns'
import DataTable from '@/components/Table/data-table'
import AddClassDialog from './_components/AddClass.dialog'
import { apiGetClasses } from '@/services/ClassService'


const Classes = () => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  
  const { data: classes, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<IClass[]>>({
      api: apiGetClasses,
      param: {
          pagination: { page, limit },
          sort: { field, order },
      },
      key: ["Classes", String(page), String(limit)],
      requireAuth: true
  })

  const columns = classColumnnsMaker()

  return (
    <div className=''>
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Classes</h2>
            <AddClassDialog refetch={refetch}>
                <Button className='flex items-center gap-2 p-2 px-4 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
                    <MdAdd className="text-lg text-white" />
                    <span>Add Class</span>
                </Button>
            </AddClassDialog>
        </div>
        {
        (classes?.totalDocs && classes?.totalDocs > 0) ?
            <DataTable
                title="Class"
                columns={columns} 
                data={classes?.docs ?? []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(classes?.totalPages || 0)}
                totalDocs={Number(classes?.totalDocs)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                :
            <AddClassDialog refetch={refetch}>
                <NoResult
                  isLoading={isLoading}
                  image={HouseImg}
                  desc='No Class Added' 
                  buttonText='Add Class'
                  onClick={() => ''}
                />
            </AddClassDialog>
        }
    </div>
  )
}

export default Classes