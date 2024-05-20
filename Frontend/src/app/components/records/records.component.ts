import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {
  public formFilter!: FormGroup;
  public state!: string;
  public items: number[] = Array(30).fill(0);

  constructor(private form: FormBuilder) {

  }

  ngOnInit(): void {
      this.formFilter = this.form.group({
        code: ['', Validators.required],
        date: ['', Validators.required],
        state: ['', Validators.required]
      })
  }

  selectState(st: Event) {
    let stt = <HTMLSelectElement>st.target;
    this.state = stt.value;
  }
}
