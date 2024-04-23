import { Component } from '@angular/core';
import { RentRequest } from '../../models/RentRequest';
import { Rent } from '../../models/Rent';
import { Approval } from '../../models/Approval';
import { RentRequestService } from '../../services/rentrequests/rent-request.service';
import { RentService } from '../../services/rents/rent.service';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requestsandrents',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent],
  templateUrl: './requestsandrents.component.html',
  styleUrl: './requestsandrents.component.css'
})
export class RequestsandrentsComponent {

  requests: RentRequest[] = [];
  rents: Rent[] = [];
  approval = Approval;

  constructor(
    private rentRequestService: RentRequestService,
    private rentService: RentService
  ) {}
  
  ngOnInit(): void {
    this.loadRentRequests();
    this.loadRents();

  }
  
  loadRentRequests (){
    this.rentRequestService.getRentRequests().then((requests) => {
      this.requests = requests;
    }).catch((error) => {
      console.error(error);
    });
  }

  loadRents (){
    this.rentService.getRents().then((rents) => {
      this.rents = rents;
    }).catch((error) => {
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

  editRequest(rentRequest: RentRequest){

  }

  deleteRequest(idRequest: number){
    this.rentRequestService
      .deleteRentRequest(idRequest)
      .then(() => {
        console.log('Rent canceled successfully');
      })
      .catch((error) => {
        console.error('Error canceling rent request:', error);
      });
  }

  cancelRent(idRent: number){
    this.rentService
      .deleteRent(idRent)
      .then(() => {
        console.log('Rent canceled successfully');
      })
      .catch((error) => {
        console.error('Error canceling rent request:', error);
      });
  }

  payRent(rent: Rent){
    
  }

}
