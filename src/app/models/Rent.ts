import { Status } from "./status";

export class Rent {
    idRent: number;
    numPeople: number;
    price: number;
    payment: number;
    dateStart: string;
    dateEnd: string;
    ratingOwner: number;
    ratingRenter: number;
    rentStatus: number;
    status: Status;
    ownerId: number;
    renterId: number;
    propertyId: number;

    constructor(
        idRent: number,
        numPeople: number,
        price: number,
        payment: number,
        dateStart: string,
        dateEnd: string,
        ratingOwner: number,
        ratingRenter: number,
        rentStatus: number,
        status: Status,
        ownerId: number,
        renterId: number,
        propertyId: number
    ) {
        this.idRent = idRent;
        this.numPeople = numPeople;
        this.price = price;
        this.payment = payment;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.ratingOwner = ratingOwner;
        this.ratingRenter = ratingRenter;
        this.rentStatus = rentStatus;
        this.status = status;
        this.ownerId = ownerId;
        this.renterId = renterId;
        this.propertyId = propertyId;
    }
}