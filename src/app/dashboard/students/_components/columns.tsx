"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IClass, IStudent } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const studentColumnnHelper = createColumnHelper<IStudent>();

export const studentColumnnsMaker = () =>  [
    studentColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    studentColumnnHelper.accessor("name", {
        header: ({ column }) => <ColumnHead title="Name" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    studentColumnnHelper.accessor("gender", {
        header: ({ column }) => <ColumnHead title="Gender" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    studentColumnnHelper.accessor("age", {
        header: ({ column }) => <ColumnHead title="Age" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    studentColumnnHelper.accessor("class", {
        header: ({ column }) => <ColumnHead title="Class" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{(info.getValue() as IClass).title}</span>,
    }),
    studentColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Date Joined" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    studentColumnnHelper.accessor(row => row, {
        id: 'actions',
        sortingFn: "text",
        cell: (info) => {
            const rowData = info.getValue()
            const id = rowData?._id;
            return (
                <Actions
                    viewLink={`/classes/${id}`}
                    // actions={[
                    //     {
                    //         label: "Add Manager",
                    //         fn: () => setOrganisation(id || ''),
                    //         icon: Eye,
                    //     },
                    //     {
                    //         label: "Login As Employer",
                    //         fn: () => loginAsEmployer({ email: (rowData?.manager as ManagerInterface)?.email }),
                    //         icon: Eye
                    //     },
                    // ]}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<IStudent>[];
