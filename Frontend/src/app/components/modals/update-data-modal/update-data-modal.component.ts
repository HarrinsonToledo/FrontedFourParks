import { Component, DoCheck, OnInit } from '@angular/core';
import { Customer } from '../../../core/class/Users/Customer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateState } from '../../../core/class/States/AuthenticateState';
import { InfoCardSend, InfoChangeUser, InfoSendPassword } from '../../../interfaces/User';
import { sha1 } from 'js-sha1';

@Component({
  selector: 'app-update-data-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-data-modal.component.html',
  styleUrl: './update-data-modal.component.css'
})
export class UpdateDataModalComponent implements OnInit, DoCheck {
  public formData!: FormGroup;
  public formPassword!: FormGroup;
  public formCard!: FormGroup;

  public typeCard!: number;
  public errorMessage: string[] = [];

  public succes: boolean = false;
  public seguro: boolean = true;

  constructor(
    public customer: Customer,
    private form: FormBuilder,
    public authenticate: AuthenticateState
  ) {

  }

  ngDoCheck(): void {
    if (this.customer.isChangeDate == 1 && this.seguro) {
      this.succes = true;
      this.customer.loadCustomer(this.customer.getInfo()!.N_NOMBRE_USUARIO, true)
      this.seguro = false;
    } else if (this.customer.isChangeDate == 2 && this.errorMessage.length == 0) {
      this.errorMessage.push('Error no fue posible actualizar la infomación.')
    }

    if (this.customer.isChagePassword == 1) {
      this.succes = true;
    } else if (this.customer.isChagePassword == 2 && this.errorMessage.length == 0) {
      this.errorMessage.push('Error no fue posible cambiar la contraseña.')
    }

    if (this.customer.isAddCard == 1 && this.seguro) {
      this.succes = true;
      this.customer.loadCards();
      this.seguro = false;
    } else if (this.customer.isAddCard == 2 && this.errorMessage.length == 0) {
      this.errorMessage.push('Error no fue posible guardar la tarjeta.')
    }
  }

  ngOnInit(): void {
    this.formData = this.form.group({
      firstName: [this.customer.getInfo()!.N_PRIMER_NOMBRE, [Validators.required, this.authenticate.customValidator('')]],
      secondName: [this.customer.getInfo()!.N_SEGUNDO_NOMBRE == 'null' ? '':this.customer.getInfo()!.N_SEGUNDO_NOMBRE],
      firstLastName: [this.customer.getInfo()!.N_PRIMER_APELLIDO, [Validators.required, this.authenticate.customValidator('')]],
      secondLastName: [this.customer.getInfo()!.N_SEGUNDO_APELLIDO, Validators.required],
      numberCell: [this.customer.getInfo()!.Q_NUM_CELULAR, Validators.required],
      email: [this.customer.getInfo()!.O_EMAIL, [Validators.required, Validators.email]],
    })

    this.formPassword = this.form.group({
      password: ['', [Validators.required, this.authenticate.customValidator('p')]],
      passwordConfirm: ['', [Validators.required]]
    })

    this.formCard = this.form.group({
      nameProp: ['', Validators.required],
      numberCard: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      csv: ['', Validators.required],
      typeCard: ['', Validators.required]
    })
  }

  selectTypeCard(type: Event) {
    let t = <HTMLSelectElement>type.target;
    this.typeCard = parseInt(t.value)
  }

  sendPassword() {
    const info: InfoSendPassword = {
      nameUser: this.customer.getInfo()!.N_NOMBRE_USUARIO,
      password: sha1(this.formPassword.value.password)
    }
    this.customer.changePassword(info);
  }

  sendInfoUser() {
    this.errorMessage = [];
    this.succes = false;
    const info: InfoChangeUser = {
      numDoc: this.customer.getInfo()!.K_NUM_DOCUMENTO,
      nameUser: this.customer.getInfo()!.N_NOMBRE_USUARIO,
      typeDoc: this.customer.getInfo()!.I_TIPO_DOC,
      numberCel: parseInt(this.formData.value.numberCell),
      email: this.formData.value.email,
      N_SEGUNDO_APELLIDO: this.formData.value.secondLastName,
      N_SEGUNDO_NOMBRE: this.formData.value.secondName,
      N_PRIMER_NOMBRE: this.formData.value.firstName,
      N_PRIMER_APELLIDO: this.formData.value.firstLastName
    }

    this.seguro = true;
    this.customer.changeData(info);
  }

  sendCard() {
    this.errorMessage = [];
    this.succes = false;
    if (!this.verifyCard(this.formCard.value.numberCard)) this.errorMessage.push('Número de tarjeta inválido.')
    if (this.formCard.value.csv.toString().length !== 3) this.errorMessage.push('El CSV debe ser de 3 digitos.')
    if (parseInt(this.formCard.value.numberCard.toString()[0]) != this.typeCard) this.errorMessage.push('Número de tarjeta no coincide con el tipo.')
    const find = this.customer.getCards()!.filter((t) => t.numTarjeta == this.formCard.value.numberCard.toString())
    if (find.length != 0) this.errorMessage.push('Tarjeta ya ingresada.')
    this.verifyDate(this.formCard.value.dateExpiration)

    this.seguro = false;
    if (this.errorMessage.length == 0) this.sendInfoCard();
  }

  sendInfoCard() {
    this.errorMessage = [];
    this.succes = false;
    const info: InfoCardSend = {
      idCard: this.customer.getInfo()!.N_NOMBRE_USUARIO.substring(0, 5) + this.formCard.value.numberCard.toString().substring(0, 5),
      namePro: this.formCard.value.nameProp,
      numberCard: this.formCard.value.numberCard,
      csv: parseInt(this.formCard.value.csv),
      dateExp: this.formCard.value.dateExpiration,
      numDoc: this.customer.getInfo()!.K_NUM_DOCUMENTO,
      typeDoc: this.customer.getInfo()!.I_TIPO_DOC
    }
    this.customer.saveCard(info);
  }

  verifyDate(dateIn: string) {
    const today = new Date()
    const date = new Date(dateIn)
    if (date < today) this.errorMessage.push('La fecha de vencimiento erronea.')
  }

  verifyCard(numberCard: string): boolean {
    if (!/^\d+$/.test(numberCard)) {
      return false;
    }
    let suma = 0;
    let debeDuplicar = false;

    for (let i = numberCard.length - 1; i >= 0; i--) {
      let digito = parseInt(numberCard.charAt(i), 10);
      if (debeDuplicar) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
      suma += digito;
      debeDuplicar = !debeDuplicar;
    }
    return (suma % 10) === 0;
  }

  ocult() {
    this.customer.showUpdateData = false;
    this.customer.showUpdatePassword = false;
    this.customer.showAddCard = false;

    this.customer.isAddCard = 0;
    this.customer.isChagePassword = 0;
    this.customer.isChangeDate = 0;
  }
}
