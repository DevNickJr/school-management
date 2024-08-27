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
import { IPaginatedResponse, IReducerAction, IAcademicYear } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiAddAcademicYear } from "@/services/AcademicYear";

export interface IAcademicYearReducerAction extends IReducerAction<keyof IAcademicYear> {
    payload: string | number
}

const initialState: IAcademicYear = {
	school: '',
	year: '',
}
export default function AddAcademicYearDialog({
	children,
	onSuccess = () => { },
	refetch,
}: {
	children: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<IAcademicYear[]>, Error>>;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const user = useAuthContext()

	const [data, dispatch] = useReducer((state: IAcademicYear, action: IAcademicYearReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addAcademicYearMutation.mutate({ ...data, school: user.school || ''})
	};

	const addAcademicYearMutation = useMutate<IAcademicYear, any>(
		apiAddAcademicYear,
		{
		  onSuccess: () => {
			toast.success("Academic Year added Successfully")
			refetch()
			dispatch({ type: 'reset', payload: '' })
			setOpen(false)
		  },
		  showErrorMessage: true
		}
	)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{addAcademicYearMutation?.isPending && <Loader />}
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Add AcademicYear</DialogTitle>
					<DialogDescription>Add AcademicYear to your school</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
						<div className="flex flex-col gap-2">
                            <Label htmlFor="startYear" className="">
                                Session
                            </Label>
                            <Input
                                id="startYear"
                                name="startYear"
                                placeholder=""
                                className=""
                                value={data.year}
								onChange={(e) => dispatch({ type: "year", payload: e.target.value})}
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
