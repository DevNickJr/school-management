"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import useFetch from '@/hooks/useFetch'
import { IClassStudent, IPaginatedResponse } from '@/interfaces'
import DataTable from '@/components/Table/data-table'
import { apiGetClassStudents } from '@/services/ClassService'
import { classStudentsColumnnsMaker } from './class-students.columns'
import { useAuthContext } from '@/hooks/useAuthContext'
import NoResult from '@/components/NoResult'
import HouseImg from "@/assets/auth.png"


const ClassStudents = ({ classId }: { classId: string }) => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const context = useAuthContext()

  
  const { data: classStudents, refetch, isLoading } = useFetch<IPaginatedResponse<IClassStudent[]>>({
      api: apiGetClassStudents,
      param: {
          pagination: { page, limit },
          sort: { field, order },
          id: classId,
          academicYear: context.academicYear,
      },
      key: ["classStudents", context.academicYear || '', classId, String(page), String(limit)],
      requireAuth: true,
      enabled: !!classId,
  })
  
  console.log({context, classStudents})
  const classStudentColumns = classStudentsColumnnsMaker()

  return (
    <section className="mt-4">
        <h2 className='mb-2 text-xl font-semibold text-black/80'>Students</h2>        
        {
        !!(classStudents?.totalDocs && classStudents?.totalDocs > 0) ?
            <DataTable
                title="classStudents"
                columns={classStudentColumns} 
                data={classStudents?.docs ?? []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(classStudents?.totalPages || 0)}
                totalDocs={Number(classStudents?.totalDocs)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                :
                <NoResult
                    isLoading={isLoading}
                    image={HouseImg}
                    desc='No Student for this session' 
                    buttonText='Add Student'
                    onClick={() => ''}
                />
        }
    </section>
  )
}

export default ClassStudents