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
import React, { useReducer } from "react";
import type { FormEvent, ReactNode } from "react";
import { IPaginatedResponse, IReducerAction, IChangeTerm, TermEnum, IAcademicYear } from "@/interfaces";
import useMutate from "@/hooks/useMutate";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { apiSetActiveTerm } from "@/services/AcademicYear";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthContext } from "@/hooks/useAuthContext";

export interface IChangeTermReducerAction extends IReducerAction<keyof IChangeTerm> {
    payload: string | number
}

const initialState: IChangeTerm = {
	activeTerm: TermEnum.FIRST,
}

const terms: TermEnum[] = [
    TermEnum.FIRST,
    TermEnum.SECOND,
    TermEnum.THIRD,
]


export default function SetTermDialog({
	children,
	refetch,
    id,
    setId,
}: {
	children?: ReactNode;
	onSuccess?: () => void;
    
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IPaginatedResponse<IAcademicYear[]>, Error>>
    id: string;
    setId: (id: string) => void;
}) {  
	const { dispatch: loginDispatch, ...user } = useAuthContext()
	const [data, dispatch] = useReducer((state: IChangeTerm, action: IChangeTermReducerAction) => {
		if (action.type === "reset") {
			return initialState;
		}
		return { ...state, [action.type]: action.payload }
	}, initialState)

    const setActiveTermMutation = useMutate<IChangeTerm, any>(
        apiSetActiveTerm,
        {
          onSuccess: (data: IAcademicYear) => {
            toast.success("Active Term Changed Successfully")
			if (data.isActive) {
				loginDispatch({ type: 'LOGIN', payload: {
					...user,
					term: data.activeTerm || null,
				} })
			}
            refetch()
			setId('')
          },
          showErrorMessage: true,
		  id,
        },
    )
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setActiveTermMutation.mutate(data)
	};
    
	return (
		<Dialog open={!!id} onOpenChange={(id) => setId('')}>
			{setActiveTermMutation?.isPending && <Loader />}
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto text-gray-800">
				<DialogHeader>
					<DialogTitle>Set Term</DialogTitle>
					<DialogDescription>Change Active Term</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4 gap-x-5">
                    <div className="grid gap-4">
						<div className="flex flex-col gap-2">
                            <Select 
                                // onChange={(e) => dispatch({ type: "year", payload: e.target.value})}
							   defaultValue={TermEnum.FIRST}
                               onValueChange={ 
                                 (value) => dispatch({ type: "activeTerm", payload: value })
                               }
                               value={data.activeTerm}
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
