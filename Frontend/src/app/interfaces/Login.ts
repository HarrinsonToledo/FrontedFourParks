export interface LoginDataInterface {
    user: string,
    password: string
}

export interface LoginResponse {
    message: string,
    token: string,
    rol: string
}