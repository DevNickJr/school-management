"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useReducer, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { IPaginatedResponse, IReducerAction, IClass, EducationalStage, ITeacher, IAssignFormTeacher } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiAssignFormTeacher } from "@/services/ClassService";
import useFetch from "@/hooks/useFetch";
import { apiGetAllTeachers } from "@/services/TeacherServices";

export interface IIAssignFormTeacherReducerAction extends IReducerAction<keyof IClass> {
    payload: string | number
}

const initialState: IAssignFormTeacher = {
    id: '',
	formTeacher: '',
}
export default function AssignFormTeacherDialog({
	children,
	onSuccess = () => { },
	refetch,
	open,
	setOpen,
	id,
}: {
    id: string,
	children?: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<IClass[]>, Error>>
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	open: boolean
}) {
	const [data, dispatch] = useReducer((state: IAssignFormTeacher, action: IIAssignFormTeacherReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		assignFormTeacherMutation.mutate({ ...data, id })
	};

    const assignFormTeacherMutation = useMutate<IAssignFormTeacher, any>(
        apiAssignFormTeacher,
        {
          onSuccess: () => {
            toast.success("Form Teacher Assigned Successfully")
			dispatch({ type: 'reset', payload: '' })
            refetch()
			setOpen(false)
          },
          showErrorMessage: true
        }
      )
    

	const { data: teachers } = useFetch<ITeacher[]>({
		api: apiGetAllTeachers,
		key: ["AllTeachers"],
		requireAuth: true
	})
  

	return (
        <>
		{assignFormTeacherMutation?.isPending && <Loader />}
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Form Teacher</DialogTitle>
					<DialogDescription>Assign form teacher to class</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
						<div className="flex flex-col gap-2">
                            <Label htmlFor="formTeacher" className="">
                                Select Form Teacher
                            </Label>
							<Select onValueChange={(value) => dispatch({ type: "formTeacher", payload: value })} defaultValue={data.formTeacher as string}>
								<SelectTrigger className="">
									<SelectValue placeholder="" />
								</SelectTrigger>
								<SelectContent>
									{
										teachers?.map(teacher => (
											<SelectItem key={teacher._id} value={teacher._id || ''}>{teacher.name}</SelectItem> 
										))
									}
								</SelectContent>
							</Select>
                        </div>
                    </div>
					<DialogFooter className="flex items-center justify-center sm:justify-center">
						<Button
					
                            className="text-xs font-semibold w-full max-w-[250px]"
							type="submit"
						>
							Submit
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
        </>
	);
}
