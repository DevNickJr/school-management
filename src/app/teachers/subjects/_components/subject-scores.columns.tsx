"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IAcademicYear, IClassStudent, IScore } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const scoresColumnnHelper = createColumnHelper<IScore>();

export const scoresColumnnsMaker = () =>  [
    scoresColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    scoresColumnnHelper.accessor("classStudent", {
        header: ({ column }) => <ColumnHead title="Student" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IClassStudent)?.student?.name}</span>,
    }),
    scoresColumnnHelper.accessor("academicYear", {
        header: ({ column }) => <ColumnHead title="Session" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IAcademicYear)?.startYear}/{(info.getValue() as IAcademicYear)?.endYear}</span>,
    }),
    scoresColumnnHelper.accessor("term", {
        header: ({ column }) => <ColumnHead title="Term" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() + ' Term'}</span>,
    }),
    scoresColumnnHelper.accessor("CA", {
        header: ({ column }) => <ColumnHead title="CA" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    scoresColumnnHelper.accessor("exam", {
        header: ({ column }) => <ColumnHead title="Exam" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    scoresColumnnHelper.accessor("total", {
        header: ({ column }) => <ColumnHead title="Total" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    scoresColumnnHelper.accessor("remark", {
        header: ({ column }) => <ColumnHead title="Remarks" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    scoresColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Recorded At" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    // scoresColumnnHelper.accessor(row => row, {
    //     id: 'actions',
    //     sortingFn: "text",
    //     cell: (info) => {
    //         const rowData = info.getValue()
    //         const id = rowData?._id;
    //         return (
    //             <Actions
    //                 viewLink={`/classes/${id}`}
    //             />
    //         );
    //     },
    //     header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    // }),
] as ColumnDef<IScore>[];
