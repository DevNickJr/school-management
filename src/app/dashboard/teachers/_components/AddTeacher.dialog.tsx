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
import { GenderEnum, IPaginatedResponse, IReducerAction, ITeacher } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import { apiAddTeacher } from "@/services/TeacherServices";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface ITeacherReducerAction extends IReducerAction<keyof ITeacher> {
    payload: string
}

const initialState: ITeacher = {
	name: '',
	email: '',
	password: '',
	gender: GenderEnum.NONE, 
	schoolId: '',
}
export default function AddTeacherDialog({
	children,
	onSuccess = () => { },
	refetch,
}: {
	children: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<ITeacher[]>, Error>>;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const user = useAuthContext()
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const [data, dispatch] = useReducer((state: ITeacher, action: ITeacherReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTeacherMutation.mutate({ ...data, schoolId: user.account || '' })
	};

	const addTeacherMutation = useMutate<ITeacher, any>(
		apiAddTeacher,
		{
		  onSuccess: () => {
			toast.success("Teacher added Successfully")
			refetch()
			dispatch({ type: 'reset', payload: '' })
			setOpen(false)
		  },
		  showErrorMessage: true
		}
	  )

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{addTeacherMutation?.isPending && <Loader />}
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Add Teacher</DialogTitle>
					<DialogDescription>Add Teacher to your school</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
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
                            <Label htmlFor="email" className="">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
								type="email"
                                placeholder=""
                                className=""
                                value={data.email}
                                onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder=""
                                className=""
								type="password"
                                value={data.password}
                                onChange={(e) => dispatch({ type: "password", payload: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="gender" className="">
                                Gender
                            </Label>
							<Select onValueChange={(value) => dispatch({ type: "gender", payload: value })} defaultValue={data.gender}>
								<SelectTrigger className="">
									<SelectValue placeholder="Gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="MALE">Male</SelectItem>
									<SelectItem value="FEMALE">Female</SelectItem>
								</SelectContent>
							</Select>

                        </div>
                    </div>
					<DialogFooter className="flex items-center justify-center sm:justify-center">
						<Button
					
                            className="text-xs font-semibold w-full max-w-[250px]"
							type="submit"
						>
							{isLoading
								? "Submiting..."
								: "Submit"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
