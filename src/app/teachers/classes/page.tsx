"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IPaginatedResponse, IClass } from '@/interfaces'
import NoResult from '@/components/NoResult'
import { classColumnnsMaker } from './_components/columns'
import DataTable from '@/components/Table/data-table'
import { apiGetTeacherClasses } from '@/services/ClassService'


const TeacherClasses = () => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  
  const { data: classes, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<IClass[]>>({
      api: apiGetTeacherClasses,
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
            <h2 className='text-3xl font-bold text-black/80'>Teacher Classes</h2>
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
            <NoResult
                isLoading={isLoading}
                image={HouseImg}
                desc='You are not a form teacher. Check the subjects tab to see your subjects' 
            //   buttonText='Add Class'
                onClick={() => ''}
            />
        }
    </div>
  )
}

export default TeacherClasses