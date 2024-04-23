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
import { UserService } from '../../services/users/user.service';
import { RentRequestService } from '../../services/rentrequests/rent-request.service';
import { Status } from '../../models/status';
import { Approval } from '../../models/Approval';

@Component({
  selector: 'app-request-rent',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './request-rent.component.html',
  styleUrl: './request-rent.component.css',
})
export class RequestRentComponent {
  property: Property;
  owner: User;
  renterId = 2; // TODO: get renterId from session
  rentRequest: RentRequest;

  rentRequestForm = new FormGroup({
    dateStart: new FormControl(''),
    dateEnd: new FormControl(''),
    numPeople: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyServiceService,
    private userService: UserService,
    private rentRequestService: RentRequestService
  ) {
    this.property = {} as Property;
    this.owner = {} as User;
    this.rentRequest = {} as RentRequest;
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

    this.rentRequest = new RentRequest(
      0,
      dateStart,
      dateEnd,
      numPeople,
      this.calculatePrice(),
      Approval.INPROCESS,
      this.property.ownerId,
      this.renterId,
      this.property.idProperty,
      Status.ACTIVE
    );

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
