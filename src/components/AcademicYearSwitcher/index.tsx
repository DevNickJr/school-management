"use client"
import useFetch from '@/hooks/useFetch'
import { IAcademicYear } from '@/interfaces'
import { apiGetAllAcademicYears } from '@/services/AcademicYear'
import React from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from '../ui/select'
import { Label } from '../ui/label'
import { useAuthContext } from '@/hooks/useAuthContext'

const AcademicYearSwitcher = ({ showLabel=false }: { showLabel?: boolean }) => {
  const context = useAuthContext()
  
  const { data: academicYears } = useFetch<IAcademicYear[]>({
    api: apiGetAllAcademicYears,
    key: ["AcademicYears"],
    requireAuth: true
  })

  return (
    <div className="flex flex-col gap-2">
      {
        showLabel &&
        <Label htmlFor="stage" className="">
            Stage
        </Label>
      }
      <Select 
        onValueChange={
          (value) => context.dispatch({ 
            type: "LOGIN", payload: {
              ...context,
              academicYear: value,
            }})
        }
        defaultValue={context.academicYear || ''}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Stage" />
        </SelectTrigger>
        <SelectContent>
          {
            academicYears?.map(el => (
              <SelectItem key={el._id} value={el._id || ''}>{el.startYear}/{el.endYear}</SelectItem> 
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default AcademicYearSwitcher