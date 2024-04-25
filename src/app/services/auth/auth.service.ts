import {Injectable} from '@angular/core';
import axios from "axios";
import {LoginForm} from "../../utils/schemas/AuthTypes";

import {User} from "../../models/User";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async handleLogin(user: LoginForm) {
    try {
      const data = await axios.post<User>(`${environment.backendURL}/auth/login`, user);
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
}
