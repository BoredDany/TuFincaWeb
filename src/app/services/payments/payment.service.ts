import { Injectable } from '@angular/core';

import axios from 'axios';
import { environment } from '../../environment/environment';
import { Payment } from '../../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private localUrl = 'http://localhost:8080/grupo23/transactions/';

  constructor() { }

  //GET
  getPayments(): Promise<Payment []>{
    return axios.get<Payment []>(this.localUrl , {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //GET BY ID
  getPaymentById(id: number): Promise<Payment>{
    return axios.get<Payment>(this.localUrl + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //POST 
  postPayment(payment: Payment): Promise<Payment>{
    return axios.post<Payment>(this.localUrl, payment, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //PUT
  putPayment(payment: Payment): Promise<Payment>{
    return axios.put<Payment>(this.localUrl + payment.idTransaction, payment, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //DELETE
  deletePayment(id: number): Promise<Payment>{
    return axios.delete<Payment>(this.localUrl + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

}
