import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Property } from '../../models/Property';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { UserService } from '../../services/users/user.service';
import { RentRequestService } from '../../services/rentrequests/rent-request.service';
import { RentRequest } from '../../models/RentRequest';
import { Approval } from '../../models/Approval';
import { Status } from '../../models/status';

@Component({
  selector: 'app-edit-request',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './edit-request.component.html',
  styleUrl: './edit-request.component.css',
})
export class EditRequestComponent {
  startDate: String = {} as String;
  endDate: String = {} as String;
  numPeople: number = {} as number;
  property = {} as Property;
  owner = {} as User;
  rentRequest = {} as RentRequest;
  renterId = 2; // TODO: get renterId from session
  totalPrice: number = 0;

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
    this.loadRentRequest();
  }

  loadRentRequest() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    this.rentRequestService
      .getRentRequestById(id)
      .then((request) => {
        this.rentRequest = request;
        this.getProperty(this.rentRequest.propertyId);

        // Set the initial values of the form controls
      this.rentRequestForm.patchValue({
        dateStart: this.rentRequest.dateStart,
        dateEnd: this.rentRequest.dateEnd,
        numPeople: this.rentRequest.numPeople.toString(),
      });


      })
      .catch((error) => {
        console.error(error);
      });
  }

  getProperty(propertyId: number) {
    this.propertyService
      .getPropertybyId(propertyId)
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

  updateRequest() {
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

    this.rentRequest.dateStart = dateStart;
    this.rentRequest.dateEnd = dateEnd;
    this.rentRequest.numPeople = numPeople;
    this.rentRequest.price = this.calculatePrice();
    this.rentRequest.approval = Approval.INPROCESS;

    console.log('Rent request modificated');

    this.rentRequestService
      .putRentRequest(this.rentRequest)
      .then(() => {
        console.log('Rent request posted successfully');
      })
      .catch((error) => {
        console.error('Error posting rent request:', error);
      });
  }
}
