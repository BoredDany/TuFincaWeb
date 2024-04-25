import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { RentRequest } from '../../models/RentRequest';
import { RentRequestService } from '../../services/rentrequests/rent-request.service';
import { CommonModule } from '@angular/common';
import { Approval } from '../../models/Approval';
import { Rent } from '../../models/Rent';
import { Status } from '../../models/status';
import { RentService } from '../../services/rents/rent.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css',
})
export class MyPropertiesComponent {
  requests: RentRequest[] = [];
  rents: Rent[] = [];
  approval = Approval;
  renterId = 2; // obtener del usuario loggeado

  constructor(
    private rentRequestService: RentRequestService,
    private rentService: RentService
  ) {}

  ngOnInit(): void {
    this.loadRentRequests();
    this.loadRents();
  }

  loadRentRequests() {
    this.rentRequestService
      .getRentRequests()
      .then((requests) => {
        this.requests = requests;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadRents() {
    this.rentService
      .getRents()
      .then((rents) => {
        this.rents = rents;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getApproval(rentRequest: RentRequest) {
    switch (rentRequest.approval) {
      case Approval.INPROCESS:
        return 'En proceso';
      case Approval.ACCEPTED:
        return 'Aceptado';
      case Approval.REJECTED:
        return 'Rechazado';
      default:
        return 'Estado desconocido';
    }
  }

  getRentStatus(rent: Rent) {
    switch (rent.rentStatus) {
      case Approval.PAYING:
        return 'En proceso pago';
      case Approval.PAYED:
        return 'Pagado';
      case Approval.CANCELLED:
        return 'Cancelada';
      case Approval.ENDED:
        return 'Finalizada';
      default:
        return 'Estado desconocido';
    }
  }

  setButtonsStatus(rent: Rent){
    return rent.rentStatus == Approval.PAYED ||
    rent.rentStatus == Approval.CANCELLED ||
    rent.rentStatus == Approval.ENDED;
  }

  acceptRequest(request: RentRequest) {
    let rent: Rent = new Rent(
      0,
      request.numPeople,
      request.price,
      0,
      request.dateStart,
      request.dateEnd,
      0,
      0,
      Approval.PAYING,
      Status.ACTIVE,
      request.ownerId,
      this.renterId,
      request.propertyId
    );

    request.approval = Approval.ACCEPTED;

    this.rentService
      .postRent(rent)
      .then(() => {
        console.log('Rent posted successfully');
      })
      .catch((error) => {
        console.error('Error posting rent:', error);
      });

    this.rentRequestService
      .putRentRequest(request)
      .then(() => {
        console.log('Rent request accepted successfully');
      })
      .catch((error) => {
        console.error('Error accepting rent request:', error);
      });
  }

  rejectRequest(request: RentRequest) {
    request.approval = Approval.REJECTED;
    this.rentRequestService
      .putRentRequest(request)
      .then(() => {
        console.log('Rent request rejected successfully');
      })
      .catch((error) => {
        console.error('Error rejecting rent request:', error);
      });
  }

  cancelRent(rent: Rent) {
    rent.rentStatus = Approval.CANCELLED;
    this.rentService
      .putRent(rent)
      .then(() => {
        console.log('Rent canceled successfully');
      })
      .catch((error) => {
        console.error('Error canceling rent:', error);
      });
  }
}
