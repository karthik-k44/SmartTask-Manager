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
    FEATURES = 'FEATURES',
    ABOUT = 'ABOUT',
    CONTACT = 'CONTACT',
    DASHBOARD = 'DASHBOARD',
    PROFILE = 'PROFILE',
    SETTINGS = 'SETTINGS',
    RESUME_BUILDER = 'RESUME_BUILDER',
    AI_ANALYZER = 'AI_ANALYZER',
    
}