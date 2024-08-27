"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IClassSubject, IPaginatedResponse } from '@/interfaces'
import NoResult from '@/components/NoResult'
import DataTable from '@/components/Table/data-table'
import { apiGetTeacherSubjects } from '@/services/ClassService'
import { teacherSubjectsColumnnsMaker } from './_components/teacher-subjects.columns'
import { toast } from 'react-toastify'
import { useAuthContext } from '@/hooks/useAuthContext'

const TeacherSubjects = () => {
    const { limit, onPaginationChange, page, pagination } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const context = useAuthContext()

    console.log({ context });
    
    const { data: teacherSubjects, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<IClassSubject[]>>({
        api: apiGetTeacherSubjects,
        param: {
            pagination: { page, limit },
            sort: { field, order },
            teacherId: context.accountId,
        },
        key: ["teacherSubjects", context.accountId || '', String(page), String(limit)],
        requireAuth: true,
        enabled: !!context.accountId,
    })

    const teacherSubjectColumns = teacherSubjectsColumnnsMaker()

    return (
        <div className='pb-10'>
            <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
                <h2 className='text-3xl font-bold text-black/80'>Subjects</h2>
            </div>
            <section className="mt-4 mb-10">
                {
                (teacherSubjects?.totalDocs && teacherSubjects?.totalDocs > 0) ?
                    <DataTable
                        title="teacherSubjects"
                        columns={teacherSubjectColumns} 
                        data={teacherSubjects?.docs ?? []} 
                        onPaginationChange={onPaginationChange}
                        pageCount={Number(teacherSubjects?.totalPages || 0)}
                        totalDocs={Number(teacherSubjects?.totalDocs)}
                        pagination={pagination}
                        onSortingChange={onSortingChange}
                        sorting={sorting}
                    />
                    :
                    <NoResult
                        isLoading={isLoading}
                        image={HouseImg}
                        desc='No Subject Added' 
                        buttonText='Contact Admin'
                        onClick={() => toast.info("Admin office wey dey next to you?")}
                    />
                }
            </section>
        </div>
    )
}

export default TeacherSubjects