import { Injectable } from '@angular/core';
import {Photo} from "../../models/Photo";
import axios from "axios";
import {environment} from "../../environment/environment";
import {buildRequest} from "../../utils/networkRequest";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  jwtKey = `Bearer ${localStorage.getItem("jwt")}`;
  constructor() { }

  getAll() {
    return buildRequest<Photo>(
      `${environment.backendURL}/photos/`,
      "get",
      this.jwtKey
    );
  }

  getOne(id: number) {
    return buildRequest<Photo>(
      `${environment.backendURL}/photos/${id}`,
      "get",
      this.jwtKey
    );
  }

  create(data: Photo) {
    return buildRequest<Photo>(
      `${environment.backendURL}/photos/`,
      "post",
      this.jwtKey,
      data
    );
  }

  updateOne(id: number, data: Photo) {
    return buildRequest<Photo>(
      `${environment.backendURL}/photos/${id}`,
      "put",
      this.jwtKey,
      data
    );
  }

  deleteOne(id: number) {
    return buildRequest<Photo>(
      `${environment.backendURL}/photos/${id}`,
      "delete",
      this.jwtKey
    );
  }
}
