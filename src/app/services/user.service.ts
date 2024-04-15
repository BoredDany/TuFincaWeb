import { Injectable } from '@angular/core';
import { User } from '../models/User';

import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsersExternal(): Promise < User[] > {
    return axios.get('https://gruposjaveriana.dynaco.co/grupo23/controllers/user/').then(response => response.data);
  }

  getUsersInternal(): Promise < User[] > {
    return axios.get('http://localhost:8080/grupo23/controllers/user/').then(response => response.data);
  }
}
