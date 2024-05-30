import { Injectable } from "@angular/core";
import { ImagePosition, Workbook } from "exceljs";
import * as fs from 'file-saver'; 

@Injectable({
    providedIn: 'root'
})
export class GenerateExcel {
    private workbook!: Workbook;
    constructor() {

    }

    public async downloadExcel(dataExcel: Array<any>, header: Array<string>, name: string) {
        this.workbook = new Workbook();
        this.workbook.creator = 'four-parks-colombia';
        await this.createTable(dataExcel, header, name)
        this.workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data])
            fs.saveAs(blob, 'report.xlsx')
        });
    }

    private async createTable(dataExcel: Array<any>, header: Array<string>, name: string) {
        const sheet = this.workbook.addWorksheet(name);
        const iter = ['B', 'C', 'D', 'E']


        iter.forEach((c) => {
            sheet.getColumn(c).width = 30;
        })

        sheet.columns.forEach((column) => {
            column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
        });
        const logo = this.workbook.addImage({
            base64: await this.getBase64ImageFromURL('../../../../assets/resources/Logo/LOGOB.png'),
            extension: 'png',
        })
        const position: ImagePosition = {
            tl: { col: 1.15, row: 1.3},
            ext: { width: 210, height: 128}
        }
        sheet.addImage(logo, position);

        const headerRow = sheet.getRow(10);
        headerRow.values = header;
        headerRow.font =  { bold: true, size: 12};

        const rowsToInsert = sheet.getRows(11, dataExcel.length);
        for(let index = 0; index < rowsToInsert.length; index++) {
            const data = dataExcel[index];
            const row = rowsToInsert[index];
            row.values = ['', data[0], data[1], data[2], data[3]];
            row.font =  { size: 10 };
        }
    }

    public getBase64ImageFromURL(url: string): Promise<string> {
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
}