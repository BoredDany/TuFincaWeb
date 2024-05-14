import { Approval } from "./Approval";
import { Status } from "./status";

export class Rent {
    idRent: number;
    numPeople: number;
    price: number;
    dateStart: string;
    dateEnd: string;
    payment: number;
    ratingOwner: number;
    ratingRenter: number;
    status: Status;
    ownerId: number;
    renterId: number;
    propertyId: number;
    rentStatus: Approval;

    constructor(
        idRent: number,
        numPeople: number,
        price: number,
        dateStart: string,
        dateEnd: string,
        payment: number,
        ratingOwner: number,
        ratingRenter: number,
        status: Status,
        ownerId: number,
        renterId: number,
        propertyId: number,
        rentStatus: Approval
    ) {
        this.idRent = idRent;
        this.numPeople = numPeople;
        this.price = price;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.payment = payment;
        this.ratingOwner = ratingOwner;
        this.ratingRenter = ratingRenter;
        this.status = status;
        this.ownerId = ownerId;
        this.renterId = renterId;
        this.propertyId = propertyId;
        this.rentStatus = rentStatus;

    }
}