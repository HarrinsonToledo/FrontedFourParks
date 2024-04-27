export interface SigninDataInterface {
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    NID: number,
    typeID: string,
    numberCell: number,
    email: string,
    userName: string,
    password: string
}

export interface SigninResponse {
    message: string
}