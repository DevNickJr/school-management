"use client"
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

const TermSwitcher = ({ showLabel=false }: { showLabel?: boolean }) => {
  const context = useAuthContext()
  const terms = [
    "FIRST",
    "SECOND",
    "THIRD",
  ]

  return (
    <div className="flex flex-col gap-2">
      {
        showLabel &&
        <Label htmlFor="Term" className="">
            Term
        </Label>
      }
      <Select 
        onValueChange={
          (value) => context.dispatch({ 
            type: "LOGIN", payload: {
              ...context,
              term: value,
            }})
        }
        defaultValue={context.term || ''}
        value={context.term || ''}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Term" />
        </SelectTrigger>
        <SelectContent>
          {
            terms?.map(term => (
              <SelectItem key={term} value={term}>{term[0] + term.slice(1).toLowerCase()}</SelectItem> 
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default TermSwitcher