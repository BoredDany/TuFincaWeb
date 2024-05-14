import { Injectable } from '@angular/core';

import axios from 'axios';
import { Rent } from '../../models/Rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private deployUrl = 'https://gruposjaveriana.dynaco.co/grupo23/rents/';
  private localUrl = 'http://localhost:8080/grupo23/rents/';

  constructor() { }

  //GET
  getRents(): Promise<Rent []>{
    return axios.get<Rent []>(this.localUrl, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //GET BY ID
  getRentById(id: number): Promise<Rent>{
    return axios.get<Rent>(this.localUrl + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //POST 
  postRent(rent: Rent): Promise<Rent>{
    return axios.post<Rent>(this.localUrl, rent, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //PUT
  putRent(rent: Rent): Promise<Rent>{
    return axios.put<Rent>(this.localUrl + rent.idRent, rent, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //DELETE
  deleteRent(id: number): Promise<Rent>{
    return axios.delete<Rent>(this.localUrl + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

}
