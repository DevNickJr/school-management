"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IClassSubject } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const classSubjectColumnnHelper = createColumnHelper<IClassSubject>();

export const classSubjectColumnnsMaker = () =>  [
    classSubjectColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    // classSubjectColumnnHelper.accessor("class", {
    //     header: ({ column }) => <ColumnHead title="Class" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    classSubjectColumnnHelper.accessor("subject.title", {
        header: ({ column }) => <ColumnHead title="Subject" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classSubjectColumnnHelper.accessor("teacher.name", {
        header: ({ column }) => <ColumnHead title="Teacher" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classSubjectColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Created At" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    classSubjectColumnnHelper.accessor(row => row, {
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
] as ColumnDef<IClassSubject>[];
