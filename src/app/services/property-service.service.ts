import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/Property';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  private deployUrl = 'https://gruposjaveriana.dynaco.co/grupo23/properties/';
  private localUrl = 'http://localhost:8080/grupo23/properties/';

  constructor() { }

  getPropertiesDeploy(): Promise<Property []>{
    return axios.get<Property []>(this.localUrl).then(response => response.data);
  }

}
