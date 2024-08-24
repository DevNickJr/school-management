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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useReducer, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IPaginatedResponse, IReducerAction, ISubject } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiAddSubject } from "@/services/SubjectService";

export interface ISubjectReducerAction extends IReducerAction<keyof ISubject> {
    payload: string | number
}

const initialState: ISubject = {
	title: '',
	school: '',
}
export default function AddSubjectDialog({
	children,
	onSuccess = () => { },
	refetch,
}: {
	children: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<ISubject[]>, Error>>;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const user = useAuthContext()
	const router = useRouter();

	const [data, dispatch] = useReducer((state: ISubject, action: ISubjectReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addSubjectMutation.mutate({ ...data, school: user.school || ''})
	};

	const addSubjectMutation = useMutate<ISubject, any>(
		apiAddSubject,
		{
		  onSuccess: () => {
			toast.success("Subject added Successfully")
			refetch()
			dispatch({ type: 'reset', payload: '' })
			setOpen(false)
		  },
		  showErrorMessage: true
		}
	  )

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{addSubjectMutation?.isPending && <Loader />}
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Add Subject</DialogTitle>
					<DialogDescription>Add subject to your school</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
						<div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="">
                                Title/Name
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder=""
                                className=""
                                value={data.title}
								onChange={(e) => dispatch({ type: "title", payload: e.target.value })}
                            />
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
