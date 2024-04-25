import { Status } from "./status";

export class Account {
    idAccount: number;
    bank: string;
    accountNumber: string;
    status: Status;
    idUser: number;

    constructor(idAccount: number, bank: string, accountNumber: string, status: Status, idUser: number) {
        this.idAccount = idAccount;
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.status = status;
        this.idUser = idUser;
    }
}