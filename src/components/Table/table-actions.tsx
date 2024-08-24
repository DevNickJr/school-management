"use client";
import { Eye, EllipsisVertical, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { IconType } from "react-icons/lib";

export default function Actions<T,>({
    viewLink,
    viewLabel="View",
    actions,
    viewFunction,
}: {
    viewLink?: string;
    viewLabel?: string;
    viewFunction?: () => void;
    actions?: {
        element?: ReactNode;
        label?: string;
        fn?: () => void;
        icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | IconType;
    }[]
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                <div className="flex justify-center">
                    <EllipsisVertical color="#506FF4" size={'1.1rem'} className="cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="center" forceMount>
                {
                    !!viewLink &&
                    <DropdownMenuItem className="flex gap-2 p-1">
                        <MenuItem>
                            <Link onClick={() => viewFunction && viewFunction()} href={viewLink} className="flex items-center w-full gap-2">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full">
                                    <Eye size={'1.1rem'} className="text-primary group-hover:text-white" />
                                </div>
                                <p>{viewLabel}</p>
                            </Link>
                        </MenuItem>
                    </DropdownMenuItem>
                }
                {
                    actions?.map((action, index) => (
                        <DropdownMenuItem key={index} onClick={() => action.fn && action.fn()} className="p-0">
                            <MenuItem>
                            {
                                !!action.element ? action.element :
                                <>
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full">
                                        {
                                        action.icon ? 
                                        <action.icon size={'1.1rem'} className="text-primary group-hover:text-white" /> 
                                        : <Eye size={'1.1rem'} className="text-primary group-hover:text-white" />
                                        }
                                    </div>
                                    <p className="">{action.label}</p>
                                </>
                            }
                            </MenuItem>

                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>

        </DropdownMenu >
    );
}


const MenuItem = ({
    children,
}: {
    children: ReactNode;
}) => {
   return <div className="flex w-full gap-2 p-1 text-black rounded-md cursor-pointer hover:bg-primary hover:text-white group">
        {children}
    </div> 
}