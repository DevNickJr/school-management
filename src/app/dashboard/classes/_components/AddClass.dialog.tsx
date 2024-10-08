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
import { IPaginatedResponse, IReducerAction, IClass, ITeacher } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiAddClass } from "@/services/ClassService";
import useFetch from "@/hooks/useFetch";
import { apiGetAllTeachers } from "@/services/TeacherServices";

export interface IClassReducerAction extends IReducerAction<keyof IClass> {
    payload: string | number
}

const initialState: IClass = {
	title: '',
	formTeacher: '',
	grade: 0,
	school: '',
}
export default function AddClassDialog({
	children,
	onSuccess = () => { },
	refetch,
}: {
	children: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<IClass[]>, Error>>;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const user = useAuthContext()

	const [data, dispatch] = useReducer((state: IClass, action: IClassReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addClassMutation.mutate({ ...data, school: user.school || '' })
	};

	const addClassMutation = useMutate<IClass, any>(
		apiAddClass,
		{
		  onSuccess: () => {
			toast.success("Class added Successfully")
			refetch()
			dispatch({ type: 'reset', payload: '' })
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
		<Dialog open={open} onOpenChange={setOpen}>
			{addClassMutation?.isPending && <Loader />}
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Add Class</DialogTitle>
					<DialogDescription>Add Class to your school</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
						{/* <div className="flex flex-col gap-2">
                            <Label htmlFor="stage" className="">
                                Stage
                            </Label>
							<Select onValueChange={(value) => dispatch({ type: "stage", payload: value })} defaultValue={data.stage}>
								<SelectTrigger className="">
									<SelectValue placeholder="Stage" />
								</SelectTrigger>
								<SelectContent>
									{
										Object.values(EducationalStage).map(el => (
											<SelectItem key={el} value={el}>{el}</SelectItem> 
										))
									}
								</SelectContent>
							</Select>
                        </div> */}
                        {/* <div className="flex flex-col gap-2">
                            <Label htmlFor="level" className="">
                                level
                            </Label>
                            <Input
                                id="level"
                                name="level"
                                placeholder="Nurser 1 = 1, Nursery 3 = 3, Primary 1 = 1, Primary 5 = 5"
                                className=""
                                value={data.level || ''}
								type="number"
                                onChange={(e) => dispatch({ type: "level", payload: Number(e.target.value) })}
                            />
                        </div> */}
						<div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Title/Name
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="eg. Primary 1"
                                className=""
                                value={data.title}
                                onChange={(e) => dispatch({ type: "title", payload: e.target.value })}
                            />
                        </div>
						<div className="flex flex-col gap-2">
                            <Label htmlFor="formTeacher" className="">
                                Form Teacher
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
					<p className="text-xs">
						NOTE: Classes should be added in order (from lowest grade to highest) - eg Nursery 1 {'->'} Nursery 2 {'->'} Nursery 3 {'->'} Primary 1 {'->'} ..... SSS 3
					</p>
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
