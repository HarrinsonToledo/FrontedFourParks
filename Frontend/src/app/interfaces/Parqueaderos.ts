export interface infoCities {
    codCiudad: string,
    nombre: string
}

export interface infoParking {
    codParqueadero: string,
    nombre: string,
    iEstado: string,
    i24Hrs: string,
    horaApertura: string,
    horaCierre: string,
    iFidelizacion: string,
    direccion: string,
    latitud: number,
    longitud: number,
    codGerente: string,
    tipoParqueadero: string,
    ciudad: string,
    codTarifa: string,
    numPuestos: number
}

export interface InfoGetFee {
    idTarifa: string,
    tarifaMoto: number,
    tarifaCarro: number,
    tarifaExtraCarro: number,
    tarifaExtraMoto: number
}

export interface InfoEditPark {
    direccion: string,
    codTarifa: string,
    nombre: string,
    i24Hrs: string,
    horaCierre: string | null,
    latitud: number,
    horaApertura: string | null ,
    longitud: number,
    codGerente: string,
    tipoParqueadero: string,
    codParqueadero: string,
    iFidelizacion: string,
    ciudad: string,
    iEstado: string,
    numPuestos: number,
    tarifaMoto: number,
    tarifaCarro: number,
    tarifaExtraCarro: number,
    tarifaExtraMoto: number
}

export interface ResponseEditPark {
    success: string[],
    fail: string[]
}