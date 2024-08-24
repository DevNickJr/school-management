"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IAssignFormTeacher, IClass, ITeacher } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { UseMutationResult } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const classColumnnHelper = createColumnHelper<IClass>();

export const classColumnnsMaker = ({
    setClassId,
}: {
    setClassId: React.Dispatch<React.SetStateAction<string>>
}) =>  [
    classColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    classColumnnHelper.accessor("title", {
        header: ({ column }) => <ColumnHead title="Title" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classColumnnHelper.accessor("formTeacher", {
        header: ({ column }) => <ColumnHead title="Form Teacher" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as ITeacher)?.name}</span>,
    }),
    classColumnnHelper.accessor("stage", {
        header: ({ column }) => <ColumnHead title="Stage" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classColumnnHelper.accessor("level", {
        header: ({ column }) => <ColumnHead title="Level" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    classColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Created At" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    classColumnnHelper.accessor(row => row, {
        id: 'actions',
        sortingFn: "text",
        cell: (info) => {
            const rowData = info.getValue()
            const id = rowData?._id;
            return (
                <Actions
                    viewLink={`/dashboard/classes/${id}`}
                    viewLabel="Manage"
                    actions={[
                        {
                            label: "Form Teacher",
                            fn: () => setClassId(id || '')
                        }
                    ]}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<IClass>[];
