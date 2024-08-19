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
import { useRouter } from "next/navigation";
import { IPaginatedResponse, IReducerAction, IStudent, EducationalStage, GenderEnum, IClass } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiAddStudent } from "@/services/StudentService";
import useFetch from "@/hooks/useFetch";
import { apiGetAllClasses } from "@/services/ClassService";

export interface IStudentReducerAction extends IReducerAction<keyof IStudent> {
    payload: string | number
}

const initialState: IStudent = {
	school: '',
	name: '',
	age: 0,
	gender: '',
	currentClass: '',
	email: '',
	password: '',
}
export default function AddStudentDialog({
	children,
	onSuccess = () => { },
	refetch,
}: {
	children: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<IStudent[]>, Error>>;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const user = useAuthContext()
	const router = useRouter();

	const [data, dispatch] = useReducer((state: IStudent, action: IStudentReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addStudentMutation.mutate({ ...data, school: user.account || '' })
	};

	const addStudentMutation = useMutate<IStudent, any>(
		apiAddStudent,
		{
		  onSuccess: () => {
			toast.success("Student added Successfully")
			refetch()
			dispatch({ type: 'reset', payload: '' })
			setOpen(false)
		  },
		  showErrorMessage: true
		}
	)

	const { data: classes} = useFetch<IClass[]>({
		api: apiGetAllClasses,
		key: ["Classes"],
		requireAuth: true
	})
  

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{addStudentMutation?.isPending && <Loader />}
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Add Student</DialogTitle>
					<DialogDescription>Add Student to your school</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
						<div className="flex flex-col gap-2">
                            <Label htmlFor="Class" className="">
                                Class
                            </Label>
							<Select onValueChange={(value) => dispatch({ type: "currentClass", payload: value })} defaultValue={data.name}>
								<SelectTrigger className="">
									<SelectValue placeholder="" />
								</SelectTrigger>
								<SelectContent>
									{
										classes?.map(el => (
											<SelectItem key={el._id} value={el._id!}>{el.title}</SelectItem> 
										))
									}
								</SelectContent>
							</Select>
                        </div>
						<div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder=""
                                className=""
                                value={data.name}
                                onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="age" className="">
                                Age
                            </Label>
                            <Input
                                id="age"
                                name="age"
                                placeholder=""
                                className=""
                                value={data.age || ''}
								type="number"
                                onChange={(e) => dispatch({ type: "age", payload: Number(e.target.value) })}
                            />
                        </div>
						<div className="flex flex-col gap-2">
                            <Label htmlFor="gender" className="">
                                Gender
                            </Label>
							<Select onValueChange={(value) => dispatch({ type: "gender", payload: value })} defaultValue={data.gender}>
								<SelectTrigger className="">
									<SelectValue placeholder="" />
								</SelectTrigger>
								<SelectContent>
									{
										Object.values(GenderEnum)?.map(value => (
											<SelectItem key={value} value={value}>{value}</SelectItem>
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
	);
}
