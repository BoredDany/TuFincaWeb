import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../../models/Property';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  private deployUrl = 'https://gruposjaveriana.dynaco.co/grupo23/properties/';
  private localUrl = 'http://localhost:8080/grupo23/properties/';

  constructor() { }

  //GET
  getProperties(): Promise<Property []>{
    return axios.get<Property []>(this.localUrl).then(response => response.data);
  }

  //GET BY ID
  getPropertybyId(id: number): Promise<Property>{
    return axios.get<Property>(this.localUrl + id).then(response => response.data);
  }

  //POST 
  postProperty(property: Property): Promise<Property>{
    return axios.post<Property>(this.localUrl, property).then(response => response.data);
  }

  //PUT
  updateProperty(property: Property): Promise<Property>{
    return axios.put<Property>(this.localUrl + property.idProperty, property).then(response => response.data);
  }

  //DELETE
  deleteProperty(id: number): Promise<Property>{
    return axios.delete<Property>(this.localUrl + id).then(response => response.data);
  }

}
