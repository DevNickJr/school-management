import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";


export default function ColumnHead<T, K>({
    title,
    column,
    className
}: {
    title: string;
    column: Column<T, K>;
    className?: string;
}) {
    return (
        <span 
         onClick={() => column.getCanSort() && column.toggleSorting()}
        className={cn(
           "gap-1 capitalize whitespace-nowrap relative cursor-pointer flex items-center group",
            className
          )}>
            {title}
            <button
                type="button"
                onClick={() => column.toggleSorting()}
                className={`hover:bg-gray-200 rounded p-1 ${column.getCanSort() ? !!column.getIsSorted() ? "relative" : 'absolute -z-10 group-hover:relative group-hover:z-auto' : 'hidden'}`}
            >
                {column.getIsSorted() === "asc" ? (
                    <ArrowUp size={15} />
                ) : column.getIsSorted() === "desc" ? (
                    <ArrowDown size={15} />
                ) : (
                    <ArrowUp size={15} className="" />
                )}
            </button>
        </span>
    );
}