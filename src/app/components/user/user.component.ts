import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import AOS from "aos";
import { MessageService } from "primeng/api";
import { UserService } from "../../services/users/user.service";
import { AuthService } from "../../services/auth/auth.service"; // Importa el servicio AuthService para obtener el usuario logeado
import { User } from '../../models/User';
import { RegisterForm } from '../../utils/schemas/AuthTypes';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService] // Ya no es necesario incluir UserService como proveedor aquí
})
export class UserComponent implements OnInit {
  form: FormGroup | undefined; // Define la propiedad form como FormGroup

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService // Inyecta el servicio AuthService
  ) {}

  ngOnInit() {
    AOS.init();

    // Obtener el usuario logeado al inicializar el componente
    const loggedInUser = this.authService.getLoggedInUser();

    // Inicializar el formulario con los datos del usuario logeado
    this.form = new FormGroup({
      name: new FormControl(loggedInUser.name, Validators.required),
      email: new FormControl(loggedInUser.email, [Validators.email, Validators.required]),
      phone: new FormControl(loggedInUser.phone, Validators.required),
    });
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error', summary: '¡Ups!', detail: msg
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      this.showError("Revisa los datos ingresados");
      return;
    }

    const updatedUser: RegisterForm = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: parseInt(this.form.value.phone), // Asegúrate de convertir el teléfono a número si es necesario
    };

    const success = await this.userService.updateUser(updatedUser);

    if (success) {
      this.showError("Usuario actualizado correctamente");
    } else {
      this.showError("Error al actualizar el usuario");
    }
  }
}
