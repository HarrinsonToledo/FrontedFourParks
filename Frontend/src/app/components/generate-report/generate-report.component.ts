import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GeneratePDF } from '../../core/class/Objets/generatePDF';
import { Parking } from '../../core/class/Objets/Parking';
import { infoParking } from '../../interfaces/Parqueaderos';
import { Manager } from '../../core/class/Users/Manager';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.css'
})
export class GenerateReportComponent implements DoCheck {

  public parkings!: infoParking[];

  constructor(private pdf: GeneratePDF, private parks: Parking, private manager: Manager) {

  }

  ngDoCheck(): void {
    if (this.parks.getParkings() == undefined && this.parks.seguroParks) { this.parks.loadParkings(); this.parks.seguroParks = false}
    this.parkings = this.parks.getParkings()!;
    if (this.parkings != undefined && this.manager.getInfo() != undefined) { 
      this.parkings = this.parkings.filter((p) => p.codGerente == this.manager.getInfo()?.K_COD_GERENTE)!
    }
  }

  generatePDF() {
    const info: Array<any> = [];

    this.parkings.map((p) => {
      info.push([p.codParqueadero, p.nombre, 0, 0])
    })

    console.log(info)

    this.pdf.createPDFGeneral(info);
  }
}
