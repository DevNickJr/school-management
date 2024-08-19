"use client"
import React from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IAcademicYear, IPaginatedResponse } from '@/interfaces'
import { MdAdd } from 'react-icons/md'
import NoResult from '@/components/NoResult'
import { Button } from '@/components/ui/button'
import { academicYearColumnnsMaker } from './_components/columns'
import DataTable from '@/components/Table/data-table'
import AddAcademicYearDialog from './_components/AddAcademicYear.dialog'
import { apiActivateAcademicYear, apiGetAcademicYears } from '@/services/AcademicYear'
import useMutate from '@/hooks/useMutate'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'


const AcademicYear = () => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  
  const { data: academicYears, error, isLoading, isFetching, refetch, fetchStatus } = useFetch<IPaginatedResponse<IAcademicYear[]>>({
      api: apiGetAcademicYears,
      param: {
          pagination: { page, limit },
          sort: { field, order },
      },
      key: ["AcademicYears", String(page), String(limit)],
      requireAuth: true
  })

  const activateAcademicYearMutation = useMutate<string, any>(
    apiActivateAcademicYear,
    {
      onSuccess: () => {
        toast.success("Activated Successfully")
        refetch()
      },
      showErrorMessage: true
    }
)

  const columns = academicYearColumnnsMaker({ activateAcademicYearMutation })

  return (
    <div className=''>
        {activateAcademicYearMutation.isPending && <Loader />}
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h2 className='text-3xl font-bold text-black/80'>Academic Years</h2>
            <AddAcademicYearDialog refetch={refetch}>
                <Button className='flex items-center gap-2 p-2 px-4 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
                    <MdAdd className="text-lg text-white" />
                    <span>Add Academic Year</span>
                </Button>
            </AddAcademicYearDialog>
        </div>
        {
        (academicYears?.totalDocs && academicYears?.totalDocs > 0) ?
            <DataTable
                title="academicYears"
                columns={columns} 
                data={academicYears?.docs ?? []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(academicYears?.totalPages || 0)}
                totalDocs={Number(academicYears?.totalDocs)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                :
            <AddAcademicYearDialog refetch={refetch}>
                <NoResult
                  isLoading={isLoading}
                  image={HouseImg}
                  desc='No academic Years Added' 
                  buttonText='Add academic Years'
                  onClick={() => ''}
                />
            </AddAcademicYearDialog>
        }
    </div>
  )
}

export default AcademicYear