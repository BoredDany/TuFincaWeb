export enum Status {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED'
}
  
export class Property {
    idProperty: number;
    name: string;
    country: string;
    city: string;
    latitude: string;
    longitude: string;
    price: number;
    area: number;
    description: string;
    rooms: number;
    bathrooms: number;
    parking: number;
    kitchens: number;
    floors: number;
    status: Status;
    ownerId: number;
    rentIds: number[];
    rentRequestIds: number[];
    photoIds: number[]; 

    constructor(
        idProperty: number,
        name: string,
        country: string,
        city: string,
        latitude: string,
        longitude: string,
        price: number,
        area: number,
        description: string,
        rooms: number,
        bathrooms: number,
        parking: number,
        kitchens: number,
        floors: number,
        status: Status,
        ownerId: number,
        rentIds: number[],
        rentRequestIds: number[],
        photoIds: number[]
    ) {
        this.idProperty = idProperty;
        this.name = name;
        this.country = country;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.price = price;
        this.area = area;
        this.description = description;
        this.rooms = rooms;
        this.bathrooms = bathrooms;
        this.parking = parking;
        this.kitchens = kitchens;
        this.floors = floors;
        this.status = status;
        this.ownerId = ownerId;
        this.rentIds = rentIds;
        this.rentRequestIds = rentRequestIds;
        this.photoIds = photoIds;
    }
}