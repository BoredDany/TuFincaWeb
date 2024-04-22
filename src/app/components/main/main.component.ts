import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true, 
  imports: [ReactiveFormsModule],
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
  }
}
