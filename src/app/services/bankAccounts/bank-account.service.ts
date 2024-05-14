import { Injectable } from '@angular/core';
import axios from 'axios';
import { Account } from '../../models/Account';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private localUrl = 'http://localhost:8080/grupo23/accounts/';

  constructor() { }

  //GET
  getAccounts(): Promise<Account []>{
    return axios.get<Account []>(this.localUrl, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //GET BY ID
  getAccountById(id: number): Promise<Account>{
    return axios.get<Account>(this.localUrl + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //POST 
  postAccount(payment: Account): Promise<Account>{
    return axios.post<Account>(this.localUrl, payment, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //PUT
  putAccount(account: Account): Promise<Account>{
    return axios.put<Account>(this.localUrl + account.idAccount, account, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

  //DELETE
  deleteAccount(id: number): Promise<Account>{
    return axios.delete<Account>(this.localUrl + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.data);
  }

}
