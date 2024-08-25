"use client"
import React, { useMemo } from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import useFetch from '@/hooks/useFetch'
import { IClassStudentScore, IClassSubject, IStudent, ISubject } from '@/interfaces'
import DataTable from '@/components/Table/data-table'
import { useAuthContext } from '@/hooks/useAuthContext'
import NoResult from '@/components/NoResult'
import HouseImg from "@/assets/auth.png"
import { apiGetAllClassSubjects, apiGetClassStudentScores } from '@/services/ClassService'
import { classStudentScoresColumnnsMaker } from './class-student-scores.columns'
import ColumnHead from '@/components/ColumnHead'
import { CellContext, Column, createColumnHelper } from '@tanstack/react-table'

const classStudentScoresColumnnHelper = createColumnHelper<IClassStudentScore>();

const ClassStudentScores = ({ classId }: { classId: string }) => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const context = useAuthContext()

  const { data: classSubjects, error } = useFetch<IClassSubject[]>({
    api: apiGetAllClassSubjects,
    param: {
        pagination: { page, limit },
        sort: { field, order },
        id: classId,
    },
    key: ["ClassSubjectsAll", classId, String(page), String(limit)],
    requireAuth: true,
    enabled: !!classId,
  })

  const subjects = useMemo(() => {
    return classSubjects?.map(classSubject => classStudentScoresColumnnHelper.accessor('scores', {
            id: classSubject._id || '',
            header: ({ column }) => <ColumnHead title={(classSubject.subject as ISubject)?.title || ''} column={column} />,
            sortingFn: "text",
            cell: (info) => {
                const score = info.getValue()?.find(val => val.classSubject === classSubject._id)
                return <span className="whitespace-nowrap">{!score ? 'NIL' : (score?.CA || 0) + (score?.exam || 0)}</span>
            }
        }))
  },[classSubjects])
  
  const { data: classStudentScores, refetch, isLoading } = useFetch<IClassStudentScore[]>({
      api: apiGetClassStudentScores,
      param: {
          pagination: { page, limit },
          sort: { field, order },
          id: classId,
          academicYear: context.academicYear,
          term: context.term,
      },
      key: ["classStudentScores", context.academicYear || '', context.term || '', classId, String(page), String(limit)],
      requireAuth: true,
      enabled: !!classId,
  })
  
  console.log({classStudentScores})
  const classStudentColumns = classStudentScoresColumnnsMaker({ subjects: subjects ?? [] })

  return (
    <section className="mt-4">
        <h2 className='mb-2 text-xl font-semibold text-black/80'>Scores</h2>        
        {
        // !!(classStudentScores?.totalDocs && classStudentScores?.totalDocs > 0) ?
        !!(classStudentScores) ?
            <DataTable
                title="classStudentScores"
                columns={classStudentColumns} 
                data={classStudentScores ?? []} 
                onPaginationChange={onPaginationChange}
                pageCount={Number(classStudentScores?.length || 0)}
                totalDocs={Number(classStudentScores?.length)}
                pagination={pagination}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
                :
                <NoResult
                    isLoading={isLoading}
                    image={HouseImg}
                    desc='No Score has been uploaded for this term' 
                    buttonText='Add Student'
                    onClick={() => ''}
                />
        }
    </section>
  )
}

export default ClassStudentScores