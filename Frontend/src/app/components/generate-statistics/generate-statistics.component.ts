import { Component, DoCheck, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Chart, ChartType } from 'chart.js/auto';
import { Administrator } from '../../core/class/Users/Administrator';

@Component({
  selector: 'app-generate-statistics',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './generate-statistics.component.html',
  styleUrl: './generate-statistics.component.css'
})
export class GenerateStatisticsComponent implements DoCheck{
  public chart: Chart;
  private typeG: string = 'S';
  private typeT: string = 'S';
  public seguro: boolean = true;

  public w: string = 'w-full';

  constructor(private admin: Administrator) {

  }

  ngDoCheck(): void {
      if(this.admin.getStadistics() == undefined && this.seguro) {
        this.admin.loadStadistics();
        this.seguro = false;
      }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  single(type: string) {
    const l = []
    const d = []
    this.admin.getStadistics().map((s) => {
      l.push(s.nombre)
      if(this.typeT == 'R'){
        d.push(s.cantReservas);
      } else if(this.typeT == 'G'){ 
        d.push(s.total)
      }
    })
    const data = {
      labels: l,
      datasets: [{
        label: 'Ganancias',
        data: d,
        fill: false,
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        tension: 0.1
      }
      ]
    }

    this.chart = new Chart('chart', {
      type: type as ChartType,
      data
    })
  }

  about(type: string) {
    const l = []
    const dG = []
    const dR = []
    this.admin.getStadistics().map((s) => {
      l.push(s.nombre)
      dG.push(s.total)
      dR.push(s.cantReservas);
    })
    const data = {
      labels: l,
      datasets: [{
        label: 'Ganancias',
        data: dG,
        fill: false,
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        tension: 0.1
      },
      {
        label: 'Reservas',
        data: dR,
        fill: false,
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        tension: 0.1
      }
      ]
    }

    this.chart = new Chart('chart', {
      type: type as ChartType,
      data
    })
  }

  selectT(e: Event) {
    if(this.chart) {
      this.chart.destroy()
    }
    let x = <HTMLSelectElement>e.target;
    this.typeT = x.value;
    this.w = this.typeG != 'radar' ? 'w-full' : 'w-1/2';
    if(this.typeT == 'A' && this.typeG != 'S') {
      this.about(this.typeG);
    } else if(this.typeT != 'S' && this.typeG != 'S') {
      this.single(this.typeG)
    }
  }

  selectG(e: Event) {
    if(this.chart) {
      this.chart.destroy()
    }
    let x = <HTMLSelectElement>e.target;
    this.typeG = x.value;
    this.w = this.typeG != 'radar' ? 'w-full' : 'w-1/2';
    if(this.typeT == 'A' && this.typeG != 'S') {
      this.about(this.typeG);
    } else if(this.typeT != 'S' && this.typeG != 'S') {
      this.single(this.typeG)
    }
  }
}
