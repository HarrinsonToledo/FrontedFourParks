import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

@Injectable({
    providedIn: 'root'
})
export class GeneratePDF {
    constructor(private datePipe: DatePipe) {

    }

    public getBase64ImageFromURL(url: string) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.setAttribute("crossOrigin", "anonymous");

            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx!.drawImage(img, 0, 0);

                var dataURL = canvas.toDataURL("image/png");

                resolve(dataURL);
            };

            img.onerror = error => {
                reject(error);
            };

            img.src = url;
        });
    }

    public openReportCity(info: Array<any>, manager: string) {
        this.structureCity(info, manager).then(d => {
            pdfMake.createPdf(d, pdfMake.tableLayouts, pdfMake.fonts, pdfFonts.pdfMake.vfs).open()
        });
    }

    public downloadReportCity(info: Array<any>, manager: string) {
        this.structureCity(info, manager).then(d => {
            pdfMake.createPdf(d, pdfMake.tableLayouts, pdfMake.fonts, pdfFonts.pdfMake.vfs).download('report.pdf')
        });
    }

    private async structureCity(info: Array<any>, manager: string): Promise<any> {
        const today = new Date()
        const formatDate = this.datePipe.transform(today, 'dd \'de\' MM \'del\' yyyy')
        const bodyTable = [
            [{ text: 'Código', style: 'tableHeader', alignment: 'center' },
            { text: 'Parqueadero', style: 'tableHeader', alignment: 'center' },
            { text: 'Total reservas', style: 'tableHeader', alignment: 'center' },
            { text: 'Ingresos', style: 'tableHeader', alignment: 'center' }
            ],
        ]

        let x = 0;
        let y = 0;
        info.map((p) => {
            bodyTable.push(p)
            x = x + p[2],
            y = y + p[3]
        })

        const dd: any = {
            info: {
                title: 'Reporte FourParksColombia',
                author: 'createjs',
                subject: 'subjest',
                keywords: 'keywords'
            },
            content: [
                {
                    image: await this.getBase64ImageFromURL('../../../../assets/resources/Logo/LOGOB.png'),
                    width: 300,
                    height: 155,
                    style: 'icono'
                },
                {
                    stack: [
                        'Four Parks Colombia',
                        { text: 'Reporte Financiero', style: 'subheader' },
                    ],
                    style: 'header'
                },
                {
                    stack: ['Estimados miembros del equipo y socios:\n\n',
                        {
                            text: 'Me complace presentarles el reporte financiero de la Four Parks Colombia, ' +
                                'desglosado por Parqueaderos a cargo del Gerente. Este reporte detalla el desempeño financiero de nuestros ' +
                                'parqueaderos, brindando una visión clara y detallada de ' +
                                'nuestros ingresos, reservas y otros indicadores financieros clave.', style: 'boldeSub'
                        }],
                    margin: [0, 20],
                    style: 'bolde'
                },
                {
                    text: 'Gerente: ' + manager,
                    style: 'manager'

                },
                {
                    text: formatDate,
                    style: 'manager'
                },
                { text: 'Tabla comparativa de resultados financieros', pageBreak: 'before', style: 'title' },
                {
                    style: 'tableExample',
                    color: '#444',
                    table: {
                        widths: [120, 150, 100, 100],
                        body: bodyTable
                    }
                },
                { text: '\nTomando en cuenta:\n\n', style: 'subtitle' },
                {
                    ul: [
                        'Ingresos totales: $' + y,
                        'Reservas totales: ' + x,
                        'Ocupación media por dia: ' + x/15
                    ]
                }
            ],
            styles: {
                icono: {
                    alignment: 'center'
                },
                header: {
                    fontSize: 45,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 190, 0, 80]
                },
                subheader: {
                    fontSize: 19,
                },
                title: {
                    fontSize: 20,
                    margin: [0, 0, 0, 35]
                },
                subtitle: {
                    bold: true,
                    fontSize: 15
                },
                bolde: {
                    bold: true,
                    fontSize: 15
                },
                boldeSub: {
                    bold: false,
                    fontSize: 13
                },
                manager: {
                    fontSize: 15,
                    bold: true
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                    alignment: 'center'
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        }
        return new Promise<any>((resolve, reject) => {
            resolve(dd);
        });
    }

    public openReportPark(info: Array<any>, manager: string, nombre: string) {
        this.structureParks(info, manager, nombre).then(d => {
            pdfMake.createPdf(d, pdfMake.tableLayouts, pdfMake.fonts, pdfFonts.pdfMake.vfs).open()
        });
    }

    public downloadReportPark(info: Array<any>, manager: string, nombre: string) {
        this.structureParks(info, manager, nombre).then(d => {
            pdfMake.createPdf(d, pdfMake.tableLayouts, pdfMake.fonts, pdfFonts.pdfMake.vfs).download('report.pdf')
        });
    }

    private async structureParks(info: Array<any>, manager: string, nombre: string): Promise<any> {
        const today = new Date()
        const formatDate = this.datePipe.transform(today, 'dd \'de\' MM \'del\' yyyy')
        const bodyTable = [
            [{ text: 'Fecha', style: 'tableHeader', alignment: 'center' },
            { text: 'Reservas', style: 'tableHeader', alignment: 'center' },
            { text: 'Ingresos', style: 'tableHeader', alignment: 'center' },
            { text: '% Ocupación', style: 'tableHeader', alignment: 'center' }
            ],
        ]

        let x = 0;
        let y = 0;
        info.map((p) => {
            bodyTable.push(p)
            x = x + p[1],
            y = y + p[2]
        })

        const dd: any = {
            info: {
                title: 'Reporte FourParksColombia',
                author: 'createjs',
                subject: 'subjest',
                keywords: 'keywords'
            },
            content: [
                {
                    image: await this.getBase64ImageFromURL('../../../../assets/resources/Logo/LOGOB.png'),
                    width: 300,
                    height: 155,
                    style: 'icono'
                },
                {
                    stack: [
                        'Four Parks Colombia',
                        { text: 'Reporte Financiero', style: 'subheader' },
                    ],
                    style: 'header'
                },
                {
                    stack: ['Estimados miembros del equipo y socios:\n\n',
                        {
                            text: 'Me complace presentarles el reporte financiero de la Four Parks Colombia, ' +
                                'desglosado por Parqueadero y sus actividades diarias. Este reporte detalla el desempeño financiero de nuestros ' +
                                'parqueaderos, brindando una visión clara y detallada de ' +
                                'nuestros ingresos, reservas y otros indicadores financieros clave.', style: 'boldeSub'
                        }],
                    margin: [0, 20],
                    style: 'bolde'
                },
                {
                    text: 'Gerente: ' + manager,
                    style: 'manager'

                },
                {
                    text: formatDate,
                    style: 'manager'
                },
                { text: 'Tabla comparativa de resultados financieros ' + nombre, pageBreak: 'before', style: 'title' },
                {
                    style: 'tableExample',
                    color: '#444',
                    table: {
                        widths: [120, 150, 100, 100],
                        body: bodyTable
                    }
                },
                { text: '\nTomando en cuenta:\n\n', style: 'subtitle' },
                {
                    ul: [
                        'Ingresos totales del Parqueadero: $' + y,
                        'Reservas totales del Parquedero: ' + x
                    ]
                }
            ],
            styles: {
                icono: {
                    alignment: 'center'
                },
                header: {
                    fontSize: 45,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 190, 0, 80]
                },
                subheader: {
                    fontSize: 19,
                },
                title: {
                    fontSize: 20,
                    margin: [0, 0, 0, 35]
                },
                subtitle: {
                    bold: true,
                    fontSize: 15
                },
                bolde: {
                    bold: true,
                    fontSize: 15
                },
                boldeSub: {
                    bold: false,
                    fontSize: 13
                },
                manager: {
                    fontSize: 15,
                    bold: true
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                    alignment: 'center'
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        }
        return new Promise<any>((resolve, reject) => {
            resolve(dd);
        });
    }
}