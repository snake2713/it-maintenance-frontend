export type T_Service =  {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    status: number,
    guarantee?: number
}

export type T_Customization = {
    id: string | null
    status: E_CustomizationStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    services: T_Service[]
    address: string
    date: string
}

export enum E_CustomizationStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
}

export type T_CustomizationsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_CustomizationStatus
}

export type T_ServicesListResponse = {
    services: T_Service[],
    draft_customization_id: number,
    services_count: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}