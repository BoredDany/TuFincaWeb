import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RentRequest } from '../../models/RentRequest';
import { Property } from '../../models/Property';
import { ActivatedRoute } from '@angular/router';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { User } from '../../models/User';
import { UserServiceService } from '../../services/users/user-service.service';
import { RentRequestService } from '../../services/retrequests/rent-request.service';
import { Status } from '../../models/status';

@Component({
  selector: 'app-request-rent',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './request-rent.component.html',
  styleUrl: './request-rent.component.css',
})
export class RequestRentComponent {
  rentRequest: RentRequest;
  property: Property;
  owner: User;

  rentRequestForm = new FormGroup({
    dateStart: new FormControl(''),
    dateEnd: new FormControl(''),
    numPeople: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyServiceService,
    private userService: UserServiceService,
    private rentRequestService: RentRequestService
  ) {
    this.rentRequest = {} as RentRequest;
    this.property = {} as Property;
    this.owner = {} as User;
  }

  ngOnInit() {
    this.loadPropertyDetail();
  }

  loadPropertyDetail() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    this.propertyService
      .getPropertybyId(id)
      .then((property) => {
        this.property = property;
        this.getOwner();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getOwner() {
    if (this.property && this.property.ownerId) {
      this.userService
        .getUserbyId(this.property.ownerId)
        .then((user) => {
          this.owner = user;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('OwnerId is undefined');
    }
  }

  calculatePrice() {
    const numPeopleControl = this.rentRequestForm.get('numPeople');
    const numPeople =
      numPeopleControl && numPeopleControl.value ? +numPeopleControl.value : 0;
    return numPeople ? numPeople * +this.property.price : 0;
  }

  requestRent() {
    const dateStartControl = this.rentRequestForm.get('dateStart');
    const dateEndControl = this.rentRequestForm.get('dateEnd');
    const numPeopleControl = this.rentRequestForm.get('numPeople');

    const dateStart =
      dateStartControl && dateStartControl.value
        ? new Date(dateStartControl.value).toISOString().slice(0, 10)
        : null;
    const dateEnd =
      dateEndControl && dateEndControl.value
        ? new Date(dateEndControl.value).toISOString().slice(0, 10)
        : null;
    const numPeople =
      numPeopleControl && numPeopleControl.value ? +numPeopleControl.value : 0;

    const now = new Date();

    if (!dateStart || !dateEnd || !numPeople) {
      console.error('All fields must be filled');
      return;
    }

    if (new Date(dateStart) <= now) {
      console.error('Start date must be greater than current date');
      return;
    }

    if (new Date(dateStart) >= new Date(dateEnd)) {
      console.error('Start date must be less than end date');
      return;
    }

    if (numPeople <= 0) {
      console.error('Number of people must be greater than 0');
      return;
    }

    // If all validations pass, create rentRequest and post it
    this.rentRequest.idRentRequest = 0;
    this.rentRequest.dateStart = dateStart;
    this.rentRequest.dateEnd = dateEnd;
    this.rentRequest.numPeople = numPeople;
    this.rentRequest.price = this.calculatePrice();
    this.rentRequest.approval = 0;
    this.rentRequest.ownerId = this.property.ownerId;
    this.rentRequest.renterId = 2; // TODO: get renterId from session
    this.rentRequest.propertyId = this.property.idProperty;
    this.rentRequest.status = Status.ACTIVE;

    this.rentRequestService
      .postRentRequest(this.rentRequest)
      .then(() => {
        console.log('Rent request posted successfully');
      })
      .catch((error) => {
        console.error('Error posting rent request:', error);
      });
  }
}
