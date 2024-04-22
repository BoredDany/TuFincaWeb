import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint, MatButton
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    photo: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    console.log(this.form.value);
    if (!this.form.valid) console.log("Sea serio socio")
  }
}
