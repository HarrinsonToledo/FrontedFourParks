import { Injectable } from "@angular/core";
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

@Injectable({
    providedIn: 'root'
})
export class GeneratePDF {
    constructor() {

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

    public async createPDFGeneral(info: Array<any>) {
        const bodyTable = [
            [{ text: 'Código', style: 'tableHeader', alignment: 'center' },
            { text: 'Parqueadero', style: 'tableHeader', alignment: 'center' },
            { text: 'Total reservas', style: 'tableHeader', alignment: 'center' },
            { text: 'Ingresos', style: 'tableHeader', alignment: 'center' }
            ],
        ]

        info.map((p) => {
            bodyTable.push(p)
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
                        { text: 'Reporte Financiero ciudad de Bogotá', style: 'subheader' },
                    ],
                    style: 'header'
                },
                {
                    stack: ['Estimados miembros del equipo y socios:\n\n',
                        {
                            text: 'Me complace presentarles el reporte financiero de la Four Parks Colombia, ' +
                                'desglosado por ciudad para el mes 04 del 2024. Este reporte detalla el desempeño financiero de nuestros ' +
                                'parqueaderos en la ciudad de Bogotá donde operamos, brindando una visión clara y detallada de ' +
                                'nuestros ingresos, reservas y otros indicadores financieros clave.', style: 'boldeSub'
                        }],
                    margin: [0, 20],
                    style: 'bolde'
                },
                {
                    text: 'Gerente Camilo',
                    style: 'manager'

                },
                {
                    text: '25 de mayo de 2024',
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
                { text: '\nPara la ciudad de Bogotá\n\n', style: 'subtitle' },
                {
                    ul: [
                        'Ingresos totales de la ciudad: $1000000.',
                        'Reservas totales de la ciudad: 10000.',
                        'Ocupación media por dia: 13.00'
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
                    fontSize: 30,
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
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        }
        pdfMake.createPdf(dd, pdfMake.tableLayouts, pdfMake.fonts, pdfFonts.pdfMake.vfs).open();
    }
}