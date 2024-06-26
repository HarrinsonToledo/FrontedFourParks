import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GeneratePDF } from '../../core/class/Objets/generatePDF';
import { Manager } from '../../core/class/Users/Manager';
import { InfoReportCity, InfoReportPark } from '../../interfaces/Reports';
import Notiflix from 'notiflix';
import { GenerateExcel } from '../../core/class/Objets/generateExcel';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.css'
})
export class GenerateReportComponent implements DoCheck {
  @ViewChild('parks') selectParks!: ElementRef<HTMLSelectElement>;

  public reportCity!:  InfoReportCity[];
  public reportPark!:  InfoReportPark[];
  public seguroTRE: boolean = true;
  public pdfSrc: any;
  public type: string = 'P';
  public select: string = 'S';
  public table: Array<any> = [];;

  constructor(private pdf: GeneratePDF, private excel: GenerateExcel, private manager: Manager) {

  }

  ngDoCheck(): void {
    if (this.reportCity == undefined && this.manager.getInfo() != undefined && this.manager.seguroC) {
      this.manager.loadCalcCity(this.manager.getInfo()?.K_COD_GERENTE!);
      this.manager.seguroC = false;
    }
    this.reportCity = this.manager.getCalcCity()!;
    this.reportPark = this.manager.getCalcPark()!;
    if(this.reportPark != undefined && this.type == 'P' && this.select != 'S') {
      this.table = this.getInfoPark()
    }
  }

  changeType(e: Event) {
    let x = <HTMLSelectElement>e.target
    this.type = x.value;
    if (this.type == 'C') {
      this.selectParks.nativeElement.disabled = true;
      this.table = this.reportCity != undefined ? this.getInfoCity() : [];
    } else {
      this.selectParks.nativeElement.disabled = false;
    }
  }

  changePark(e: Event) {
    let x = <HTMLSelectElement>e.target
    this.select = x.value;
    if (this.select != 'S') this.manager.loadCalcPark(x.value);
  }

  downloadPDF() {
    if (this.type == 'C') {
      this.pdf.downloadReportCity(
        this.getInfoCity(),
        this.manager.getInfo()?.N_PRIMER_NOMBRE! + " " + this.manager.getInfo()?.N_PRIMER_APELLIDO!
      );
    } else if(this.select != 'S') {
      this.pdf.downloadReportPark(
        this.getInfoPark(),
        this.manager.getInfo()?.N_PRIMER_NOMBRE! + " " + this.manager.getInfo()?.N_PRIMER_APELLIDO!,
        this.select
      );
    } else {
      Notiflix.Notify.warning('Para la descarga de PDF necesitas especificar la información', { timeout: 5000 })
    }
  }

  getInfoPark(): Array<any> {
    const info: Array<any> = [];

    this.reportPark.map((p) => {
      info.push([p.fecha, p.cantReservas, p.total, p.mayorOcupacion])
    })
    return info;
  }

  getInfoCity(): Array<any> {
    const info: Array<any> = [];

    this.reportCity.map((p) => {
      info.push([p.codParqueadero, p.nombre, p.cantReservas, p.total])
    })
    return info;
  }

  generatePDF() {
    if (this.type == 'C') {
      this.pdf.openReportCity(
        this.getInfoCity(),
        this.manager.getInfo()?.N_PRIMER_NOMBRE! + " " + this.manager.getInfo()?.N_PRIMER_APELLIDO!
      );
    } else if(this.select != 'S') {
      this.pdf.openReportPark(
        this.getInfoPark(),
        this.manager.getInfo()?.N_PRIMER_NOMBRE! + " " + this.manager.getInfo()?.N_PRIMER_APELLIDO!,
        this.select
      );
    } else {
      Notiflix.Notify.warning('Para la generación de PDF necesitas especificar la información', { timeout: 5000 })
    }
  }

  downloadExcel() {
    if (this.type == 'C') {
      this.excel.downloadExcel(
        this.getInfoCity(),
        ['', 'Código', 'Parqueadero', 'Total reservas', 'Ingresos'],
        'General'
      );
    } else if(this.select != 'S') {
      this.excel.downloadExcel(
        this.getInfoPark(),
        ['', 'Fecha', 'Reservas', 'Ingresos', '% Ocupación'],
        this.select
      );
    } else {
      Notiflix.Notify.warning('Para la descarga de Excel necesitas especificar la información', { timeout: 5000 })
    }
  }
}
