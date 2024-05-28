import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import AOS from 'aos'
import {MessageService} from "primeng/api";
import {RegisterForm} from "../../utils/schemas/AuthTypes";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MessageService]
})

export class MainComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    AOS.init()
    AOS.refresh()
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error', summary: '¡Ups!', detail: msg
    })
  }

  private showWait(msg: string) {
    this.messageService.add({severity: 'warn', summary: 'Calificando...', detail: msg});
  }

  async onSubmit() {
    console.log(this.form.value);
    if (!this.form.valid) {
      this.showError("Verifique los valores que ingresó")
      return;
    }

    this.showWait("Estamos creando tu cuenta. Serás redirigido al login.")
    const newPhone = parseInt(this.form.value.phone!!)

    const registerForm : RegisterForm = {
      name: this.form.value.name!!,
      password: this.form.value.password!!,
      phone: newPhone,
      email: this.form.value.email!!
    }

    const valid = await this.authService.handleRegister(registerForm)
    if (valid) this.router.navigate(["login"])
    else this.showError("No se pudo crear tu cuenta")
  }


}
