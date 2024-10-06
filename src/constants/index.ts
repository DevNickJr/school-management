// navItems.js
import { RxDashboard } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { MdOutlineContactSupport, MdOutlineOtherHouses, MdOutlinePersonPin } from 'react-icons/md';
import { INav } from '@/interfaces';

const navItems: INav[] =  [
    {
        id: 1,
        title: "",
        navItems: [
            {
                id: 1,
                title: "Dashboard",
                link: "/dashboard",
                Icon: MdOutlinePersonPin,
                root: true,
            },
        ]
    },
    {
        id: 2,
        title: "Account Management",
        navItems: [
            // {
            //     id: 1,
            //     title: "Managers",
            //     link: "/dashboard/managers",
            //     Icon: MdOutlinePersonPin,
            // },
            {
                id: 2,
                title: "Teachers",
                link: "/dashboard/teachers",
                Icon: MdOutlinePersonPin,
            },
            {
                id: 3,
                title: "Students",
                link: "/dashboard/students",
                Icon: MdOutlinePersonPin,
            },
        ]
    },
    {
        id: 3,
        title: "Entities",
        navItems: [
            {
                id: 1,
                title: "Academic Year",
                link: "/dashboard/academic-year",
                Icon: MdOutlineOtherHouses,
            },
            {
                id: 2,
                title: "Classes",
                link: "/dashboard/classes",
                Icon: MdOutlineOtherHouses,
            },
            {
                id: 3,
                title: "Subjects",
                link: "/dashboard/subjects",
                Icon: MdOutlineOtherHouses,
            },
        ]
    },
    {
        id: 4,
        title: "",
        navItems: [
            {
                id: 1,
                title: "Support",
                link: "/dashboard/support",
                Icon: MdOutlineContactSupport,
            },
            {
                id: 2,
                title: "Settings",
                link: "/dashboard/settings",
                Icon: FiSettings,
            },
            {
                id: 3,
                title: "Audit Trail",
                link: "/dashboard/audit-trail",
                Icon: HiOutlineBanknotes,
            },
        ]
    },
]

const teacherNavItems: INav[] =  [
    {
        id: 1,
        title: "",
        navItems: [
            {
                id: 1,
                title: "Dashboard",
                link: "/teachers",
                Icon: RxDashboard,
                root: true,
            },
        ]
    },
    {
        id: 3,
        title: "Entities",
        navItems: [
            {
                id: 1,
                title: "Classes",
                link: "/teachers/classes",
                Icon: MdOutlineOtherHouses,
            },
            {
                id: 2,
                title: "Subjects",
                link: "/teachers/subjects",
                Icon: MdOutlineOtherHouses,
            },
        ]
    },
]


export {
 navItems,
 teacherNavItems
}
    