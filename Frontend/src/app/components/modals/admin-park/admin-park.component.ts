import { Component, OnInit } from '@angular/core';
import { ManagerState } from '../../../core/class/States/ManagerState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-park',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-park.component.html',
  styleUrl: './admin-park.component.css'
})
export class AdminParkComponent implements OnInit {
  public formAdmin!: FormGroup;
  constructor(public managerState: ManagerState, private form: FormBuilder) {

  }

  ngOnInit(): void {
      this.formAdmin = this.form.group({
        name: [this.managerState.getEditParkAdmin().nombre, Validators.required],
        address: [this.managerState.getEditParkAdmin().direccion, Validators.required],
        latitude: [this.managerState.getEditParkAdmin().longitud, Validators.required],
        longitude: [this.managerState.getEditParkAdmin().latitud, Validators.required]
      })
  }
}
