"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { ISubject } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const subjectColumnnHelper = createColumnHelper<ISubject>();

export const subjectColumnnsMaker = () =>  [
    subjectColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    subjectColumnnHelper.accessor("title", {
        header: ({ column }) => <ColumnHead title="Title" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    subjectColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Date Joined" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    subjectColumnnHelper.accessor(row => row, {
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
] as ColumnDef<ISubject>[];
