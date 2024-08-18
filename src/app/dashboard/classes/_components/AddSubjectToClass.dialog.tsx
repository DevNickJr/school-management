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
import { Label } from "@/components/ui/label";
import React, { useReducer, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { IAddClassSubject, IClassSubject, IPaginatedResponse, IReducerAction, ISubject, ITeacher } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiAddSubjectToClass } from "@/services/ClassService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiGetAllSubjects } from "@/services/SubjectService";
import useFetch from "@/hooks/useFetch";
import { apiGetAllTeachers } from "@/services/TeacherServices";
import { useParams } from "next/navigation";

export interface IAddClassSubjectReducerAction extends IReducerAction<keyof IAddClassSubject> {
    payload: string | number
}

const initialState: IAddClassSubject = {
	class: '',
    subject: '',
    teacher: '',
}
export default function AddSubjectToClassDialog({
	children,
	onSuccess = () => { },
	refetch,
}: {
	children: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<IClassSubject[]>, Error>>;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const { id } = useParams()


	const [data, dispatch] = useReducer((state: IAddClassSubject, action: IAddClassSubjectReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addSubjectToClassMutation.mutate({ ...data, class: id as string });
	};

	const addSubjectToClassMutation = useMutate<IAddClassSubject, any>(
		apiAddSubjectToClass,
		{
		  onSuccess: () => {
			toast.success("Subject added to class Successfully")
			refetch()
			dispatch({ type: 'reset', payload: '' })
			setOpen(false)
		  },
		  showErrorMessage: true
		}
	)

	
	const { data: subjects } = useFetch<ISubject[]>({
		api: apiGetAllSubjects,
		key: ["Subjects"],
		requireAuth: true
	})
  
	
	const { data: teachers } = useFetch<ITeacher[]>({
		api: apiGetAllTeachers,
		key: ["Teachers"],
		requireAuth: true
	})
  

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{addSubjectToClassMutation?.isPending && <Loader />}
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Add Subject To Class</DialogTitle>
					<DialogDescription>Add subject to your class</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
					<div className="flex flex-col gap-2">
						<Label htmlFor="subject" className="">
							Select Subject
						</Label>
						<Select onValueChange={(value) => dispatch({ type: "subject", payload: value })} defaultValue={data.subject}>
							<SelectTrigger className="">
								<SelectValue placeholder="" />
							</SelectTrigger>
							<SelectContent>
								{
									subjects?.map(el => (
										<SelectItem key={el._id} value={el._id!}>{el.title}</SelectItem> 
									))
								}
							</SelectContent>
						</Select>
                    </div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="teacher" className="">
							Select Teacher
						</Label>
						<Select onValueChange={(value) => dispatch({ type: "teacher", payload: value })} defaultValue={data.teacher}>
							<SelectTrigger className="">
								<SelectValue placeholder="" />
							</SelectTrigger>
							<SelectContent>
								{
									teachers?.map(el => (
										<SelectItem key={el._id} value={el._id!}>{el.name}</SelectItem> 
									))
								}
							</SelectContent>
						</Select>
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
	);
}
