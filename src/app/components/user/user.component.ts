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
updateUser() {
throw new Error('Method not implemented.');
}
  form: FormGroup;  // Declaración como una instancia directa para evitar el uso de '!'

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService
  ) {
    // Se inicializa el FormGroup en el constructor para seguir las mejores prácticas
    this.form = new FormGroup({
      idUser: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    AOS.init();
    this.loadUserData();
  }

  private loadUserData() {
    const loggedInUser = this.authService.getLoggedInUser() || { idUser: '', name: '', email: '', phone: '' };
    this.form.patchValue(loggedInUser);
  }

  async onSubmit() {
    if (this.form.valid) {
      const updatedUser = this.form.value as User;  // Cast for better type assertion
      try {
        const success = await this.userService.updateUser(updatedUser);
        if (success) {
          localStorage.setItem('user', JSON.stringify(success));  // Update local storage with returned user data
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'User updated successfully'});
        } else {
          throw new Error('Failed to update user');
        }
      } catch (error) {
        this.showError('Error updating user');
      }
    } else {
      this.showError('Please check the entered data');
    }
  }

  private showError(msg: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: msg});
  }
}
