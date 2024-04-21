import { Injectable } from '@angular/core';

import axios from 'axios';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private deployUrl = 'https://gruposjaveriana.dynaco.co/grupo23/users/';
  private localUrl = 'http://localhost:8080/grupo23/users/';

  constructor() { }

  //GET
  getUsers(): Promise<User []>{
    return axios.get<User []>(this.localUrl).then(response => response.data);
  }

  //GET BY ID
  getUserbyId(id: number): Promise<User>{
    return axios.get<User>(this.localUrl + id).then(response => response.data);
  }

  //POST 
  postUser(user: User): Promise<User>{
    return axios.post<User>(this.localUrl, user).then(response => response.data);
  }

  //PUT
  updateUser(user: User): Promise<User>{
    return axios.put<User>(this.localUrl + user.idUser, user).then(response => response.data);
  }

  //DELETE
  deleteUser(id: number): Promise<User>{
    return axios.delete<User>(this.localUrl + id).then(response => response.data);
  }
}
