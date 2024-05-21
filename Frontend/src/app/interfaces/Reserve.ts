export interface InfoSendReserve {
    idReserva: string,
    fechaReserva: string,
    tiempoInicio: string,
    tiempoFinal: string,
    subTotal: number,
    numDocumento: number,
    tipoDoc: string,
    tipoVehiculo: string,
    codParqueadero: string
}

export interface InfoReserveUser {
    codReserva: string,
    fechaReserva: string,
    fechaInicio: string,
    fechaFinal: string,
    fechaSalida: string,
    dirIp: string,
    estado: string,
    subTotal: number,
    numDocumento: number,
    tipoDoc: string,
    codPuesto: string,
    codParqueadero: string,
    tipoVechiculo: string
}

export interface InfoGetFee {
    idTarifa: string,
    tarifaMoto: number,
    tarifaCarro: number,
    tarifaExtraCarro: number,
    tarifaExtraMoto: number
}