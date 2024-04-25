import { Status } from "./status";

export class Payment {
    
    idTransaction: number;
    idUserOrigin: number;
    idUserDestination: number;
    idRent: number;
    amount: number;
    status: Status;

    constructor(idTransaction: number, idUserOrigin: number, idUserDestination: number, idRent: number, amount: number, status: Status) {
        this.idTransaction = idTransaction;
        this.idUserOrigin = idUserOrigin;
        this.idUserDestination = idUserDestination;
        this.idRent = idRent;
        this.amount = amount;
        this.status = status;
    }
}