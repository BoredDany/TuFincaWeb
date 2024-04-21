import { Injectable } from '@angular/core';

import axios from 'axios';
import { RentRequest } from '../../models/RentRequest';

@Injectable({
  providedIn: 'root'
})
export class RentRequestService {

  private deployUrl = 'https://gruposjaveriana.dynaco.co/grupo23/rentrequests/';
  private localUrl = 'http://localhost:8080/grupo23/rentrequests/';

  constructor() { }

  //GET
  getRentRequests(): Promise<RentRequest []>{
    return axios.get<RentRequest []>(this.localUrl).then(response => response.data);
  }

  //GET BY ID
  getRentRequestById(id: number): Promise<RentRequest>{
    return axios.get<RentRequest>(this.localUrl + id).then(response => response.data);
  }

  //POST 
  postRentRequest(rentRequest: RentRequest): Promise<RentRequest>{
    return axios.post<RentRequest>(this.localUrl, rentRequest).then(response => response.data);
  }

  //PUT
  putRentRequest(rentRequest: RentRequest): Promise<RentRequest>{
    return axios.put<RentRequest>(this.localUrl + rentRequest.idRentRequest, rentRequest).then(response => response.data);
  }

  //DELETE
  deleteRentRequest(id: number): Promise<RentRequest>{
    return axios.delete<RentRequest>(this.localUrl + id).then(response => response.data);
  }
}
