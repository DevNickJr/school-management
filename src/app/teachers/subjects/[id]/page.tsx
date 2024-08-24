"use client"
import React, { useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import { useSorting } from '@/hooks/useSorting'
import HouseImg from "@/assets/auth.png"
import useFetch from '@/hooks/useFetch'
import { IClass, IClassStudent, IClassSubject, IPaginatedResponse, IScore, ISubject } from '@/interfaces'
import NoResult from '@/components/NoResult'
import DataTable from '@/components/Table/data-table'
import { apiGetClassStudents, apiGetClassSubject } from '@/services/ClassService'
import { useAuthContext } from '@/hooks/useAuthContext'
import { subjectStudentsColumnnsMaker } from '../_components/subject-students.columns'
import { scoresColumnnsMaker } from '../_components/subject-scores.columns'
import { apiGetSubjectScores } from '@/services/ScoreService'
import AddScoreDialog from '../_components/AddScore.dialog'

const TeacherSubject = ({ params }: { params: { id: string } }) => {
  const { limit, onPaginationChange, page, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const [classStudent, setClassStudent] = useState('');
  const context = useAuthContext();

  const { data: classSubject } = useFetch<IClassSubject>({
    api: apiGetClassSubject,
    param: {
        id: params.id
    },
    key: ["ClassSubject", params.id],
    requireAuth: true
  })

  const { data: classStudents, error, isLoading } = useFetch<IPaginatedResponse<IClassStudent[]>>({
      api: apiGetClassStudents,
      param: {
          pagination: { page, limit },
          sort: { field, order },
          id: (classSubject?.class as IClass)?._id,
          academicYear: context.academicYear,
      },
      key: ["ClassStudents", (classSubject?.class as IClass)?._id || '', context.academicYear || '', String(page), String(limit)],
      requireAuth: true,
      enabled: !!(classSubject?.class as IClass)?._id
  })

  const { data: subjectScores, isFetching, refetch: refetchScores, fetchStatus } = useFetch<IPaginatedResponse<IScore[]>>({
      api: apiGetSubjectScores,
      param: {
        classSubject: params.id,
        academicYear: context.academicYear,
        term: context.term,
      },
      key: ["Scores", params.id || '', context.academicYear || '', context.term || '', String(page), String(limit)],
      requireAuth: true,
      enabled: !!params.id,
  })

  const subjectStudentsColumnns = subjectStudentsColumnnsMaker({
    setClassStudentId: setClassStudent 
  })
  const subjectScoresColumnns = scoresColumnnsMaker()

  // console.log({ subjectScores });

  return (
    <div className=''>
        <AddScoreDialog 
          open={!!classStudent}
          setOpen={() => setClassStudent('')}
          refetch={refetchScores}
          classStudent={classStudent}
          classSubject={params.id}
        />
        <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
            <h1 className='text-3xl font-bold text-black/80'>{(classSubject?.class as IClass)?.title} - {(classSubject?.subject as ISubject)?.title}</h1>
        </div>
        <section className='mb-5'>
            <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
                <h2 className='text-xl font-bold text-black/80'>Students</h2>
            </div>
            {
            (classStudents?.totalDocs && classStudents?.totalDocs > 0) ?
                <DataTable
                    title="Student"
                    columns={subjectStudentsColumnns} 
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
                    desc='No Student Added' 
                    buttonText='Add Student'
                    onClick={() => ''}
                    />
            }
        </section>
        <section>
            <div className="flex flex-wrap justify-between gap-2 mb-5 md:flex-row md:items-center">
                <h2 className='text-xl font-bold text-black/80'>Scores</h2>
            </div>
            {
            (classStudents?.totalDocs && classStudents?.totalDocs > 0) ?
                <DataTable
                    title="Score"
                    columns={subjectScoresColumnns} 
                    data={subjectScores?.docs ?? []} 
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
                    desc='No Student Added' 
                    buttonText='Add Student'
                    onClick={() => ''}
                    />
            }
        </section>
    </div>
  )
}

export default TeacherSubject