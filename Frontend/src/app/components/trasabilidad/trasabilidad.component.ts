import { Component, DoCheck, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { trasabilidad } from '../../interfaces/User';
import { Administrator } from '../../core/class/Users/Administrator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-trasabilidad',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './trasabilidad.component.html',
  styleUrl: './trasabilidad.component.css'
})
export class TrasabilidadComponent implements DoCheck, OnInit {
  public formFilter!: FormGroup;
  public trasability!: trasabilidad[]; 
  public copy!: trasabilidad[]; 
  private seguro: boolean = true;
  constructor(private admin: Administrator, private form: FormBuilder){

  }

  ngOnInit(): void {
    this.formFilter = this.form.group({
      code: ['', Validators.required],
      dateI: ['', Validators.required],
      dateF: ['', Validators.required]
    })
}

  ngDoCheck(): void {
    if(this.admin.getTrasabilidad() == undefined && this.seguro) {
      this.admin.loadTrasabilidad();
      this.seguro = false;
    }
    if (this.trasability == undefined && this.copy != undefined) this.trasability = this.copy;
    this.copy = this.admin.getTrasabilidad()!;
  }

  select(st: Event) {
    const lt: string = this.formFilter.get('code')?.value || ''
    this.trasability = this.copy;
    this.trasability = this.formFilter.value.code != '' ? this.trasability.filter((p) => p.usuario.slice(0, lt.length) == this.formFilter.value.code) : this.trasability;
    this.trasability = this.formFilter.value.dateI != '' && this.formFilter.value.dateF != '' ? 
    this.trasability.filter((p) => new Date(p.fecha) >= new Date(this.formFilter.value.dateI) && new Date(p.fecha) <= new Date(this.formFilter.value.dateF) ) : this.trasability;
  }
}
