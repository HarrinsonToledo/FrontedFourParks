import { Component, OnInit } from '@angular/core';
import { ManagerState } from '../../../core/class/States/ManagerState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-parks',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-parks.component.html',
  styleUrl: './edit-parks.component.css'
})
export class EditParksComponent implements OnInit {
  public formEdit!: FormGroup;
  public horas: Array<string> = Array.from({ length: 24 }, (_, index) => index < 10 ? '0' + index.toString() : index.toString());
  public minutos: Array<string> = Array.from({ length: 60 }, (_, index) => index < 10 ? '0' + index.toString() : index.toString());

  constructor(public managerState: ManagerState, private form: FormBuilder) {

  }

  ngOnInit(): void {
    this.formEdit = this.form.group({
      fee: ['', Validators.required],
      capacity: ['', Validators.required],
      characteristics: ['', Validators.required],
      horaAper: ['00', Validators.required],
      minAper: ['00', Validators.required],
      horaCier: ['00', Validators.required],
      minCier: ['00', Validators.required]
    })
  }
}
