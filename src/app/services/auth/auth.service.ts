import {Injectable} from '@angular/core';
import axios, {AxiosError} from "axios";
import {LoginForm, RegisterForm} from "../../utils/schemas/AuthTypes";

import {User} from "../../models/User";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async handleLogin(user: LoginForm) {

    try {
      const data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user,
        url: `${environment.backendURL}/auth/login`
      })

      if (data.data.status == "OK") localStorage.setItem("jwt", data.data.data.results || "sitiene")
      else throw data
    } catch (e: any) {
      console.log(e)
      return false;
    }

    return true
  }

  async handleRegister(user: RegisterForm) {

      const userSend = {
        ...user,
        "photo": "pic",
        "status": "1",
        "propertyIds": [],
        "reservationIds": [],
        "rentIds": [],
        "rentRequestIds": [],
        "reservationRequestIds": [],
        "money": 0
      }

      try {
        const data = await axios.post(
          `${environment.backendURL}/auth/register`,
          userSend,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (data.data.status != "CREATED") throw data
      } catch (e) {
        console.log(e)
        return false;
      }

      return true
  }
}
