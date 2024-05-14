import { Component } from '@angular/core';
import { RentRequest } from '../../models/RentRequest';
import { Rent } from '../../models/Rent';
import { Approval } from '../../models/Approval';
import { RentRequestService } from '../../services/rentrequests/rent-request.service';
import { RentService } from '../../services/rents/rent.service';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestsandrents',
  templateUrl: './requestsandrents.component.html',
  styleUrl: './requestsandrents.component.css',
})
export class RequestsandrentsComponent {
  requests: RentRequest[] = [];
  rents: Rent[] = [];
  approval = Approval;

  constructor(
    private rentRequestService: RentRequestService,
    private rentService: RentService,
    private router: Router
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

  editRequest(rentRequest: RentRequest) {
    this.router.navigate(['/editRequest', rentRequest.idRentRequest]);
  }

  deleteRequest(idRequest: number) {
    this.rentRequestService
      .deleteRentRequest(idRequest)
      .then(() => {
        console.log('Rent request deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting rent request:', error);
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

  payRent(rent: Rent) {
    this.router.navigate(['/payRent', rent.idRent]);
  }
}
