"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { ITeacher } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const teacherColumnHelper = createColumnHelper<ITeacher>();

export const teacherColumnsMaker = () =>  [
    teacherColumnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    teacherColumnHelper.accessor("name", {
        header: ({ column }) => <ColumnHead title="Name" column={column} />,

        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    teacherColumnHelper.accessor("email", {
      header: ({ column }) => <ColumnHead title="Email" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    teacherColumnHelper.accessor("gender", {
      header: ({ column }) => <ColumnHead title="Gender" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    teacherColumnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Joined Date" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    teacherColumnHelper.accessor(row => row, {
        id: 'actions',
        sortingFn: "text",
        cell: (info) => {
            const rowData = info.getValue()
            const id = rowData?._id;
            return (
                <Actions
                    viewLink={`/teachers/${id}`}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<ITeacher>[];
