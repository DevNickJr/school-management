"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IClassStudent } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const classStudentsColumnnHelper = createColumnHelper<IClassStudent>();

export const classStudentsColumnnsMaker = () =>  [
    classStudentsColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    classStudentsColumnnHelper.accessor("student.name", {
        header: ({ column }) => <ColumnHead title="Student Name" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classStudentsColumnnHelper.accessor("student.gender", {
        header: ({ column }) => <ColumnHead title="Gender" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classStudentsColumnnHelper.accessor((val) => `${val.academicYear.startYear}/${val.academicYear.endYear}`, {
        id: 'session',
        header: ({ column }) => <ColumnHead title="Session" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classStudentsColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Created At" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    classStudentsColumnnHelper.accessor(row => row, {
        id: 'actions',
        sortingFn: "text",
        cell: (info) => {
            const rowData = info.getValue()
            const id = rowData?._id;
            return (
                <Actions
                    viewLink={`/dashboard/classes/${id}`}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<IClassStudent>[];
