export interface  InfoReportCity {
    codParqueadero: string,
    nombre: string,
    total: number,
    cantReservas: number
}

export interface InfoReportPark {
    total: number,
    fecha: string,
    cantReservas: number,
    mayorOcupacion: number
}