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
import { IPaginatedResponse, IReducerAction, IScore } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiAddScore } from "@/services/ScoreService";
import TermSwitcher from "@/components/TermSwitcher";

interface IProps {
	classStudent: string;
	classSubject: string;
	children?: ReactNode;
	onSuccess?: () => void;
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<IScore[]>, Error>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IScoreReducerAction extends IReducerAction<keyof IScore> {
    payload: string | number
}

const initialState: IScore = {
	classStudent: '',
    classSubject: '',
    academicYear: '',
    term: '',
    CA: 0,
    exam: 0,
    remark: '',
}
export default function AddScoreDialog({
	open,
	setOpen,
	classSubject,
	classStudent,
	children,
	onSuccess = () => { },
	refetch,
}: IProps) {
	const context = useAuthContext()

	const [data, dispatch] = useReducer((state: IScore, action: IScoreReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addScoreMutation.mutate({
			...data, 
			academicYear: context.academicYear!,
			term: context.term!,
			classSubject,
			classStudent,
		})
	};

	const addScoreMutation = useMutate<IScore, any>(
		apiAddScore,
		{
		  onSuccess: () => {
			toast.success("Score created Successfully")
			refetch()
			dispatch({ type: 'reset', payload: '' })
			setOpen(false)
		  },
		  showErrorMessage: true
		}
	)

	return (
		<>
			{addScoreMutation?.isPending && <Loader />}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
					<DialogHeader>
						<DialogTitle>Student Score</DialogTitle>
						<DialogDescription>Upload student score</DialogDescription>
					</DialogHeader>
					<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
						<div className="grid gap-4">
							<TermSwitcher showLabel />
							<div className="flex flex-col gap-2">
								<Label htmlFor="CA" className="">
									CA
								</Label>
								<Input
									id="CA"
									name="CA"
									placeholder=""
									className=""
									value={data.CA || ''}
									type="number"
									min={0}
									max={30}
									onChange={(e) => dispatch({ type: "CA", payload: Number(e.target.value) })}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="exam" className="">
									Exam
								</Label>
								<Input
									id="exam"
									name="exam"
									placeholder=""
									className=""
									value={data.exam || ''}
									type="number"
									min={0}
									max={70}
									onChange={(e) => dispatch({ type: "exam", payload: Number(e.target.value) })}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="remark" className="">
									Remark
								</Label>
								<Input
									id="remark"
									name="remark"
									placeholder=""
									className=""
									value={data.remark || ''}
									type="text"
									onChange={(e) => dispatch({ type: "remark", payload: e.target.value })}
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
		</>
	);
}
