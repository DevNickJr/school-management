"use client";
import ColumnHead from "@/components/ColumnHead";
import { Checkbox } from "@/components/ui/checkbox";
import { ITeacher } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Eye } from "lucide-react";

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
      cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    // teacherColumnHelper.accessor(row => row, {
    //     id: 'actions',
    //     sortingFn: "text",
    //     cell: (info) => {
    //         const rowData = info.getValue()
    //         const id = rowData?._id;
    //         return (
    //             <Action
    //                 viewLink={`/admin/accounts/${id}/employers`}
    //                 actions={[
    //                     {
    //                         label: "Add Manager",
    //                         fn: () => setOrganisation(id || ''),
    //                         icon: Eye,
    //                     },
    //                     {
    //                         label: "Login As Employer",
    //                         fn: () => loginAsEmployer({ email: (rowData?.manager as ManagerInterface)?.email }),
    //                         icon: Eye
    //                     },
    //                 ]}
    //             />
    //         );
    //     },
    //     header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    // }),
] as ColumnDef<ITeacher>[];
