"use client";
import ColumnHead from "@/components/ColumnHead";
import Actions from "@/components/Table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IAcademicYear, IChangeTerm } from "@/interfaces";
import { formatDate3 } from "@/utils/date";
import { UseMutationResult } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MdOutlineNotificationsActive } from "react-icons/md";

const academicYearColumnnHelper = createColumnHelper<IAcademicYear>();

export const academicYearColumnnsMaker = ({
    activateAcademicYearMutation,
    setActiveYearOpen,
}: {
    activateAcademicYearMutation: UseMutationResult<any, any, string, unknown>
    setActiveYearOpen: (id: string) => void
}) =>  [
    academicYearColumnnHelper.accessor("_id", {
        header: ({ column }) => <ColumnHead title="" column={column} />,
        sortingFn: "text",
        cell: (info) => <div>
            <Checkbox className="w-3.5 h-3.5" />
        </div>,
    }),
    academicYearColumnnHelper.accessor('year', {
        id: 'year',
        header: ({ column }) => <ColumnHead title="Session" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    // academicYearColumnnHelper.accessor("startYear", {
    //     header: ({ column }) => <ColumnHead title="Start" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    // academicYearColumnnHelper.accessor("endYear", {
    //     header: ({ column }) => <ColumnHead title="End" column={column} />,
    //     sortingFn: "text",
    //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    // }),
    academicYearColumnnHelper.accessor("activeTerm", {
        header: ({ column }) => <ColumnHead title="Active Term" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
    }),
    academicYearColumnnHelper.accessor("isActive", {
        header: ({ column }) => <ColumnHead title="Is Active Session" column={column} />,
        sortingFn: "text",
        cell: (info) => <span className="whitespace-nowrap">{!!info.getValue() ? 'Yes' : "No"}</span>,
    }),
    academicYearColumnnHelper.accessor("createdAt", {
      header: ({ column }) => <ColumnHead title="Created At" column={column} />,
      sortingFn: "text",
      cell: (info) => <span className="whitespace-nowrap">{formatDate3(info.getValue()?.toString())}</span>,
    }),
    academicYearColumnnHelper.accessor(row => row, {
        id: 'actions',
        sortingFn: "text",
        cell: (info) => {
            const rowData = info.getValue()
            const id = rowData?._id as string;
            return (
                <Actions
                    actions={[
                        {
                            // element?: ReactNode;
                            label: 'Activate Year',
                            fn: () => activateAcademicYearMutation.mutate(id),
                            icon: MdOutlineNotificationsActive,
                        },
                        {
                            // element?: ReactNode;
                            label: 'Set Active Term',
                            fn: () => setActiveYearOpen(id),
                            icon: MdOutlineNotificationsActive,
                        },
                    ]}
                />
            );
        },
        header: ({ column }) => <ColumnHead title="Actions" column={column} className="flex justify-center" />,
    }),
] as ColumnDef<IAcademicYear>[];
