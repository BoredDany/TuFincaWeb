import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AOS from "aos";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth/auth.service";
import {LoginForm} from "../../utils/schemas/AuthTypes";
import {Router} from "@angular/router";
import {routes} from "../../app-routing.module";

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
    AOS.refresh()
  }

  showError() {
    this.messageService.add({
      severity: 'error', summary: '¡Ups!', detail: 'Estas bobo o que'
    })
  }

  async onSubmit() {
    console.log(this.form.value);
    if (!this.form.valid) this.showError()
    else {
      const loginForm : LoginForm = Object.create(this.form.value)
      const data = await this.authService.handleLogin(loginForm)
      console.log(data)
      this.router.navigate(["/home"])
    }
  }
}
