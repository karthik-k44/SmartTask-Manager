import type { NavbarItem } from "../types";
import { NavbarItemsEnum } from "../types/navbar";

export const ProtectedNavbar : NavbarItem[] = [
    {
        label: 'Tasks',
        value: NavbarItemsEnum.TASKS
    },
    {
        label: 'Home',
        value: NavbarItemsEnum.HOME 
    },
]

export const AdminNavbar : NavbarItem[] = [
    {
        label: 'Users',
        value: NavbarItemsEnum.USERS
    },
    {
        label: 'Tasks Overview',
        value: NavbarItemsEnum.TASKS_OVERVIEW
    },
]