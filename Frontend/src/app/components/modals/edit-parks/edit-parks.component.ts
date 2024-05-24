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
  public formEdit! : FormGroup;

  constructor(public manegerState : ManagerState, private form: FormBuilder) {

  }

  ngOnInit(): void {
      this.formEdit = this.form.group({
        tarifa: ['', Validators.required]
      })
  }
}
