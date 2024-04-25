import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import AOS from 'aos'

@Component({
  selector: 'app-main',
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

  constructor( private router: Router ) {
    AOS.init()
    AOS.refresh()
  }

  onSubmit() {
    console.log(this.form.value);
    if (!this.form.valid) console.log("Sea serio socio")
  }


}
