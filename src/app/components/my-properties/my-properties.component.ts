import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { RentRequest } from '../../models/RentRequest';
import { RentRequestService } from '../../services/rentrequests/rent-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-properties',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css'
})
export class MyPropertiesComponent {

  requests: RentRequest[] = [];

  constructor(
    private rentRequestService: RentRequestService
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }
  
  loadProperties (){
    this.rentRequestService.getRentRequests().then((requests) => {
      this.requests = requests;
    }).catch((error) => {
      console.error(error);
    });
  }

  acceptRequest(idRequest: number){

  }

  rejectRequest(idRequest: number){

  }

}
