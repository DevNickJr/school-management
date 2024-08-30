"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IClassStudent } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { UseMutationResult } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const classStudentsColumnnHelper = createColumnHelper<IClassStudent>();

export const classStudentsColumnnsMaker = ({
    promoteStudentMutation,
}: {
    promoteStudentMutation: UseMutationResult<any, any, {
        id: string;
    }, unknown>
}) =>  [
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
    classStudentsColumnnHelper.accessor((val) => `${val.academicYear.year}`, {
        id: 'session',
        header: ({ column }) => <ColumnHead title="Session" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classStudentsColumnnHelper.accessor("promoted", {
        header: ({ column }) => <ColumnHead title="Promoted" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue() ? 'Yes' : 'No'}</span>,
        // cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IStudent)?.name}</span>,
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
                    actions={[
                        {
                            label: 'Promote',
                            fn: () => promoteStudentMutation.mutate({ id: id! }),
                        },
                    ]}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<IClassStudent>[];
