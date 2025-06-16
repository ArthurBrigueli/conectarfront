export interface EditUser{
    id?: number,
    name: string,
    email: string,
    password?: string
    role: 'user'|'admin'
}