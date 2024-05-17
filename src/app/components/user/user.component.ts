import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/users/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    AOS.init();
    const loggedInUser = this.authService.getLoggedInUser() || { name: '', email: '', phone: '' }; // Usa valores predeterminados si no hay datos
    this.initForm(loggedInUser);
  }

  initForm(user: User | { name: string; email: string; phone: string }) {
    this.form = new FormGroup({
      name: new FormControl(user.name, Validators.required),
      email: new FormControl(user.email, [Validators.email, Validators.required]),
      phone: new FormControl(user.phone, Validators.required),
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      this.showError("Revisa los datos ingresados");
      return;
    }

    const updatedUser = {
      ...this.authService.getLoggedInUser(), // Obtén el usuario original por si se necesitan otros campos no modificados
      ...this.form.value // Sobrescribe con los valores actualizados del formulario
    };

    // Actualiza el usuario en el backend y el local storage
    const success = await this.userService.updateUser(updatedUser);
    if (success) {
      localStorage.setItem('user', JSON.stringify(updatedUser)); // actualiza el local storage
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente'});
    } else {
      this.showError("Error al actualizar el usuario");
    }
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error', summary: '¡Ups!', detail: msg
    });
  }
}
