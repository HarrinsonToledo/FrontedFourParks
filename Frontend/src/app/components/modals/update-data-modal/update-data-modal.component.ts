import { Component, DoCheck, OnInit } from '@angular/core';
import { Customer } from '../../../core/class/Customer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateState } from '../../../core/class/AuthenticateState';

@Component({
  selector: 'app-update-data-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-data-modal.component.html',
  styleUrl: './update-data-modal.component.css'
})
export class UpdateDataModalComponent implements DoCheck, OnInit {
  public viewP: boolean = this.customer.showUpdatePassword;
  public viewU: boolean = this.customer.showUpdateData;
  public formData!: FormGroup;
  public formPassword!: FormGroup;

  constructor(
    public customer: Customer,
    private form: FormBuilder,
    public authenticate: AuthenticateState
  ) {

  }

  ngOnInit(): void {
    this.formData = this.form.group({
      firstName: ['', [Validators.required, this.authenticate.customValidator('')]],
      secondName: [],
      firstLastName: ['', [Validators.required, this.authenticate.customValidator('')]],
      secondLastName: ['', Validators.required],
      numberCell: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })

    this.formPassword = this.form.group({
      password: ['', [Validators.required, this.authenticate.customValidator('p')]],
      passwordConfirm: ['', [Validators.required]]
    })
  }

  ngDoCheck(): void {
    this.viewP = this.customer.showUpdatePassword;
    this.viewU = this.customer.showUpdateData;
  }

  ocult() {
    this.customer.showUpdateData = false;
    this.customer.showUpdatePassword = false;
  }
}
