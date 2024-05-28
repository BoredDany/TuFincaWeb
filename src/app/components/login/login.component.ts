import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AOS from "aos";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth/auth.service";
import {LoginForm} from "../../utils/schemas/AuthTypes";
import {Router} from "@angular/router";
import {routes} from "../../app-routing.module";
import {log} from "node:util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService, AuthService]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
    AOS.init()
    //AOS.refresh()
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error', summary: '¡Ups!', detail: msg
    })
  }

  private showWait(msg: string) {
    this.messageService.add({severity: 'warn', summary: 'Ingresando...', detail: msg});
  }

  async onSubmit() {
    if (!this.form.valid) this.showError("Revisa los datos ingresados")
    else {
      this.showWait("Estamos validando tu usuario")
      const loginForm : LoginForm = {
        email: this.form.value.email!!,
        password: this.form.value.password!!
      }
      const valid = await this.authService.handleLogin(loginForm)
      if (valid) this.router.navigate(["home"])
      else this.showError("Algunos de tus datos son incorrectos")
    }
  }
}
