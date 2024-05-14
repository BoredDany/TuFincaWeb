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
        this.requests = requests.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadRents() {
    this.rentService
      .getRents()
      .then((rents) => {
        this.rents = rents.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
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

  async acceptRequest(request: RentRequest) {
    try {
      request.approval = Approval.ACCEPTED;
      await this.rentRequestService.putRentRequest(request);
      console.log('Rent request accepted successfully');
      await this.postRent(request);
      console.log('Rent posted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }


  postRent(request: RentRequest): Promise<void> {
    let rent: Rent = new Rent(
      0,
      request.numPeople,
      request.price,
      request.dateStart,
      request.dateEnd,
      0,
      0,
      0,
      Status.ACTIVE,
      request.ownerId,
      request.renterId,
      request.propertyId,
      Approval.PAYING
    );

    console.log('Rent:', rent);

    return this.rentService
      .postRent(rent)
      .then(() => {
        console.log('Rent posted successfully');
      })
      .catch((error) => {
        console.error('Error posting rent:', error);
        throw error;
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
