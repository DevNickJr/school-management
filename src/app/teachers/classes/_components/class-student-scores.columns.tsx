"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IAcademicYear, IClassStudentScore, IScore, IStudent } from "@/interfaces";
import { AccessorFnColumnDef, AccessorKeyColumnDef, ColumnDef, createColumnHelper } from "@tanstack/react-table";

const classStudentScoresColumnnHelper = createColumnHelper<IClassStudentScore>();

export const classStudentScoresColumnnsMaker = ({
    subjects,
    numOfSubjects,
}: {
    subjects: AccessorKeyColumnDef<IClassStudentScore, IScore[]>[];
    numOfSubjects: number;
}) =>  [
    classStudentScoresColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    classStudentScoresColumnnHelper.accessor("student", {
        header: ({ column }) => <ColumnHead title="Student" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IStudent)?.name?.toString()}</span>,
        // cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IStudent)?.name}</span>,
    }),
    // classStudentScoresColumnnHelper.accessor("term", {
    //     header: ({ column }) => <ColumnHead title="Term" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() + ' Term'}</span>,
    // }),
    // classStudentScoresColumnnHelper.accessor("scores.CA", {
    //     header: ({ column }) => <ColumnHead title="CA" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    ...subjects,
    classStudentScoresColumnnHelper.accessor("termTotal", {
        id: 'termTotal',
        header: ({ column }) => <ColumnHead title="Total" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classStudentScoresColumnnHelper.accessor("termTotal", {
        id: 'avaerage',
        header: ({ column }) => <ColumnHead title="Average" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()/numOfSubjects}</span>,
    }),
    classStudentScoresColumnnHelper.accessor("position", {
        header: ({ column }) => <ColumnHead title="Position" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    // classStudentScoresColumnnHelper.accessor("promoted", {
    //     header: ({ column }) => <ColumnHead title="Promoted" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue() ? 'Yes' : 'No'}</span>,
    //     // cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IStudent)?.name}</span>,
    // }),
    // classStudentScoresColumnnHelper.accessor("total", {
    //     header: ({ column }) => <ColumnHead title="Total" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    // classStudentScoresColumnnHelper.accessor("remark", {
    //     header: ({ column }) => <ColumnHead title="Remarks" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    // classStudentScoresColumnnHelper.accessor("createdAt", {
    //   header: ({ column }) => <ColumnHead title="Recorded At" column={column} />,
    //   sortingFn: "text",
    //   cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    // }),
    classStudentScoresColumnnHelper.accessor(row => row, {
        id: 'actions',
        sortingFn: "text",
        cell: (info) => {
            const rowData = info.getValue()
            const id = rowData?._id;
            return (
                <Actions
                    viewLink={`/classes/${id}`}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<IClassStudentScore>[];
