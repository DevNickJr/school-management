"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IClassStudent } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const subjectStudentsColumnnHelper = createColumnHelper<IClassStudent>();

export const subjectStudentsColumnnsMaker = ({
    setClassStudentId,
}: {
    setClassStudentId: React.Dispatch<React.SetStateAction<string>>;
}) =>  [
    subjectStudentsColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    subjectStudentsColumnnHelper.accessor("student.name", {
        header: ({ column }) => <ColumnHead title="Name" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    // subjectStudentsColumnnHelper.accessor("gender", {
    //     header: ({ column }) => <ColumnHead title="Gender" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    // subjectStudentsColumnnHelper.accessor("age", {
    //     header: ({ column }) => <ColumnHead title="Age" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    // subjectStudentsColumnnHelper.accessor("currentClass", {
    //     header: ({ column }) => <ColumnHead title="Class" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IClass)?.title}</span>,
    // }),
    subjectStudentsColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Date Joined" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    subjectStudentsColumnnHelper.accessor(row => row, {
        id: 'actions',
        sortingFn: "text",
        cell: (info) => {
            const rowData = info.getValue()
            const id = rowData?._id;
            return (
                <Actions
                    viewLink={`/classes/${id}`}
                    actions={[
                        {
                            label: 'Upload Score',
                            fn: () => setClassStudentId(id || '')
                        }
                    ]}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<IClassStudent>[];
