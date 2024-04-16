import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ReactiveFormsModule],  // Correcto: Importación de ReactiveFormsModule en componente independiente
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'] // Correcto: Debe ser un array, aunque tenga un solo elemento
})
export class MainComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]), // Campo 'name' con validación de requerido
    email: new FormControl('', [Validators.required, Validators.email]), // Validación de requerido y formato de email
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]), // Validación de requerido y solo números
    photo: new FormControl(''), // Campo opcional para foto, sin validaciones
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) // Validación de requerido y longitud mínima de 6
  });

  onSubmit() {
    console.log(this.form.value); // Acción al enviar el formulario, imprime los valores en consola
  }
}

