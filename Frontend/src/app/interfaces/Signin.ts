export interface SigninDataInterface {
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    NID: string,
    typeID: string,
    numberCell: string,
    email: string,
    userName: string,
    password: string
}

export interface SigninResponse {
    message: string,
    token: string
}