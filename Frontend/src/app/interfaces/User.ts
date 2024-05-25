export interface InfoUser {
    O_EMAIL: string,
    I_ESTADO: string,
    N_SEGUNDO_APELLIDO: string,
    I_TIPO_DOC: string,
    N_PTS_FIDELIZACION: number,
    Q_NUM_CELULAR: number,
    N_SEGUNDO_NOMBRE: string,
    N_NOMBRE_USUARIO: string,
    I_ROL: string,
    N_PRIMER_NOMBRE: string,
    K_NUM_DOCUMENTO: number,
    N_PRIMER_APELLIDO: string
}

export interface InfoCard {
    identificador: string,
    numTarjeta: string,
    codSegur: number,
    nombrePropietario: string,
    fechaVencimiento: string,
    numDocumento: number,
    tipoDoc: string
}

export interface InfoCardSend {
    idCard: string,
    namePro: string,
    numberCard: string,
    csv: number,
    dateExp: string,
    numDoc: number,
    typeDoc: string
}

export interface InfoChangeUser {
    numDoc: number,
    nameUser: string,
    typeDoc: string,
    numberCel: number,
    email: string,
    N_SEGUNDO_APELLIDO: string,
    N_SEGUNDO_NOMBRE: string,
    N_PRIMER_NOMBRE: string,
    N_PRIMER_APELLIDO: string
}

export interface InfoSendPassword {
    nameUser: string,
    password: string
}

export interface InfoDeleteCard {
    idCard: string
}

export interface InfoManager {
    O_EMAIL: string,
    I_ESTADO: string,
    N_NOMBRE_USUARIO: string,
    N_SEGUNDO_NOMBRE: string,
    N_PRIMER_APELLIDO: string,
    K_COD_GERENTE: string,
    N_SEGUNDO_APELLIDO: string,
    I_ROL: string,
    N_PRIMER_NOMBRE: string
}

export interface InfoAdmin {
    O_EMAIL: string,
    I_ESTADO: string,
    N_NOMBRE_USUARIO: string,
    N_SEGUNDO_NOMBRE: string,
    N_PRIMER_APELLIDO: string,
    K_COD_ADMINISTRADOR: string,
    N_SEGUNDO_APELLIDO: string,
    I_ROL: string,
    N_PRIMER_NOMBRE: string
}