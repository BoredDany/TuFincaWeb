import { Status } from './status';

export class RentRequest {
  idRentRequest: number;
  dateStart: string;
  dateEnd: string;
  numPeople: number;
  price: number;
  approval: number;
  status: Status;
  ownerId: number;
  renterId: number;
  propertyId: number;
  
  constructor(
    idRentRequest: number,
    dateStart: string,
    dateEnd: string,
    numPeople: number,
    price: number,
    approval: number,
    ownerId: number,
    renterId: number,
    propertyId: number,
    status: Status
  ) {
    this.idRentRequest = idRentRequest;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.numPeople = numPeople;
    this.price = price;
    this.approval = approval;
    this.ownerId = ownerId;
    this.renterId = renterId;
    this.propertyId = propertyId;
    this.status = status;
  }
}
