import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoginForm, RegisterForm } from '../../utils/schemas/AuthTypes';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Maneja el proceso de inicio de sesión del usuario.
   * Almacena el token JWT y la información del usuario en el local storage.
   */
  async handleLogin(user: LoginForm): Promise<boolean> {
    try {
      const response = await axios({
        method: 'post',
        url: `${environment.backendURL}/auth/login`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${user.email}:${user.password}`)}`
        }
      });

      if (response.data.status === "OK") {
        localStorage.setItem("jwt", response.data.data.results.token);
        const userResponse = await axios.get(`${environment.backendURL}/users/email/${user.email}`, {
          headers: {
            'Authorization': `Bearer ${response.data.data.results.token}`
          }
        });
        localStorage.setItem("user", JSON.stringify(userResponse.data.data.results));
        return true;
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  /**
   * Maneja el registro de nuevos usuarios.
   * Almacena la información del usuario recién registrado en el backend.
   */
  async handleRegister(user: RegisterForm): Promise<boolean> {
    const userToSend = {
      ...user,
      photo: "pic", // Asumiendo que 'pic' es un valor predeterminado
      status: "1", // Asumiendo que '1' indica estado activo
      propertyIds: [],
      reservationIds: [],
      rentIds: [],
      rentRequestIds: [],
      reservationRequestIds: [],
      money: 0
    };

    try {
      const response = await axios.post(`${environment.backendURL}/auth/register`, userToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status !== "CREATED") {
        throw new Error('Failed to register');
      }
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  }

  /**
   * Recupera la información del usuario logueado desde el local storage.
   */
  getLoggedInUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
