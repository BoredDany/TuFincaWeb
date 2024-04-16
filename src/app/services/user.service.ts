import { Injectable } from '@angular/core';
import { User } from '../models/User';

import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  //get users 
  getUsersServer(): Promise < User[] > {
    return axios.get(`https://gruposjaveriana.dynaco.co/grupo23/controllers/user/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error getUsersServer!', error);
    });;
  }

  getUsersLocal(): Promise < User[] > {
    return axios.get(`http://localhost:8080/grupo23/controllers/user/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error getUsersLocal!', error);
    });;
  }

  //get user by id
  getUserByIdServer(id: number): Promise < User > {
    return axios.get(`https://gruposjaveriana.dynaco.co/grupo23/controllers/user/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error getUserByIdServer!', error);
    });;;
  }

  getUserByIdLocal(id: number): Promise < User > {
    return axios.get(`http://localhost:8080/grupo23/controllers/user/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error getUserByIdLocal!', error);
    });;;
  }

  //post user
  postUserServer(user: User): Promise < User[] > {
    return axios.post(`https://gruposjaveriana.dynaco.co/grupo23/controllers/user/`, user)
    .then(response => response.data)
    .catch(error => {
      console.error('Error postUserServer!', error);
    });;;
  }

  postUserLocal(user: User): Promise < User[] > {
    return axios.post(`http://localhost:8080/grupo23/controllers/user/`, user)
    .then(response => response.data)
    .catch(error => {
      console.error('Error postUserLocal!', error);
    });;;
  }

  //put user
  putUserServer(id: number, user: User): Promise<User> {
    return axios.put(`https://gruposjaveriana.dynaco.co/grupo23/controllers/user/${id}`, user)
      .then(response => response.data)
      .catch(error => {
        console.error('Error putUserServer!', error);
      });;;
  }

  putUserLocal(id: number, user: User): Promise<User> {
    return axios.put(`http://localhost:8080/grupo23/controllers/user/${id}`, user)
      .then(response => response.data)
      .catch(error => {
        console.error('Error putUserLocal!', error);
      });;;
  }

  //delete user
  deleteUserServer(id: number): Promise<void> {
    return axios.delete(`https://gruposjaveriana.dynaco.co/grupo23/controllers/user/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error deleteUserServer!', error);
      });;;
  }

  deleteUserLocal(id: number): Promise<void> {
    return axios.delete(`http://localhost:8080/grupo23/controllers/user/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error deleteUserLocal!', error);
      });;;
  }

}