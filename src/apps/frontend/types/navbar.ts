export enum NavType {
    PUBLIC = 'PUBLIC',
    PROTECTED = 'PROTECTED',
    ADMIN = 'ADMIN'
} 


export type NavbarItem ={
    label: string;
    value: NavbarItemsEnum;
}

export enum NavbarItemsEnum {
    HOME = 'HOME',
    TASKS = 'TASKS',
    USERS = 'USERS',
    TASKS_OVERVIEW = 'TASKS_OVERVIEW',
}