import { Status } from "./status";

export class Photo {
    idPhoto: number;
    url: string;
    description: string;
    status: Status;
    propertyId: number;

  constructor(idPhoto: number, url: string, description: string, status: Status, propertyId: number) {
    this.idPhoto = idPhoto;
    this.url = url;
    this.description = description;
    this.status = status;
    this.propertyId = propertyId;
  }
}
