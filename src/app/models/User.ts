import { Status } from "./status";

export class User {
  idUser: number;
  name: string;
  email: string;
  phone: number;
  photo: string;
  status: Status;
  propertyIds: number[] = [];
  reservationIds: number[] = [];
  rentIds: number[] = [];
  rentRequestIds: number[] = [];
  reservationRequestIds: number[] = [];

  constructor(
    idUser: number,
    name: string,
    email: string,
    phone: number,
    photo: string,
    status: Status,
    propertyIds: number[],
    reservationIds: number[],
    rentIds: number[],
    rentRequestIds: number[],
    reservationRequestIds: number[]
  ) {
    this.idUser = idUser;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.photo = photo;
    this.status = status;
    this.propertyIds = propertyIds;
    this.reservationIds = reservationIds;
    this.rentIds = rentIds;
    this.rentRequestIds = rentRequestIds;
    this.reservationRequestIds = reservationRequestIds;
  }
}
