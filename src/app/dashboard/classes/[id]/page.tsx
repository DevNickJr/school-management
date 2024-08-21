"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IClass, IClassSubject, IPaginatedResponse } from '@/interfaces'
import { MdAdd } from 'react-icons/md'
import NoResult from '@/components/NoResult'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/Table/data-table'
import AddSubjectToClass from '../_components/AddSubjectToClass.dialog'
import { classSubjectColumnnsMaker } from '../_components/class-subjects.columns'
import { apiGetClass, apiGetClassSubjects } from '@/services/ClassService'
import ClassStudents from '../_components/ClassStudents'

const Class = ({ params }: { params: { id: string } }) => {
    const { limit, onPaginationChange, page, pagination } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    
    const { data: classSubjects, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<IClassSubject[]>>({
        api: apiGetClassSubjects,
        param: {
            pagination: { page, limit },
            sort: { field, order },
            id: params.id,
        },
        key: ["ClassSubjects", params.id, String(page), String(limit)],
        requireAuth: true,
        enabled: !!params.id,
    })
    
    const { data } = useFetch<IClass>({
        api: apiGetClass,
        param: {
        id: params.id
        },
        key: ["Class", params.id],
        requireAuth: true
})


    const classSubjectColumns = classSubjectColumnnsMaker()

    return (
        <div className=''>
            <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
                <h2 className='text-3xl font-bold text-black/80'>{data?.title}</h2>
            </div>
            <section className="mt-4 mb-10">
            <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
                <h2 className='mb-2 text-xl font-semibold text-black/80'>Subjects</h2>        
                <AddSubjectToClass refetch={refetch}>
                    <Button className='flex items-center gap-2 p-2 px-4 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
                        <MdAdd className="text-lg text-white" />
                        <span>Add Subject To Class</span>
                    </Button>
                </AddSubjectToClass>
            </div>
                {
                (classSubjects?.totalDocs && classSubjects?.totalDocs > 0) ?
                    <DataTable
                        title="classSubjects"
                        columns={classSubjectColumns} 
                        data={classSubjects?.docs ?? []} 
                        onPaginationChange={onPaginationChange}
                        pageCount={Number(classSubjects?.totalPages || 0)}
                        totalDocs={Number(classSubjects?.totalDocs)}
                        pagination={pagination}
                        onSortingChange={onSortingChange}
                        sorting={sorting}
                    />
                        :
                    <AddSubjectToClass refetch={refetch}>
                        <NoResult
                        isLoading={isLoading}
                        image={HouseImg}
                        desc='No Subject Added' 
                        buttonText='Add Subject'
                        onClick={() => ''}
                        />
                    </AddSubjectToClass>
                }
            </section>
            <ClassStudents classId={params.id} />
        </div>
    )
}

export default Class